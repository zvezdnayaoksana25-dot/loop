import { chatCompletion } from './groq';
import { AGENT_TOOLS } from './tools';
import { getSystemPrompt } from './prompts';
import { executeTool, extractMemories, saveExtractedMemories } from './memory-extractor';
import { searchMemories, listMemories } from '../db/memories';
import type { ChatMessage } from '../types';

export interface AgentResponse {
  content: string;
  toolCalls: { name: string; result: string }[];
  streaming?: boolean;
}

export async function runAgent(
  apiKey: string,
  chatModel: string,
  extractionModel: string,
  messages: ChatMessage[],
  temperature: number = 0.7,
  onChunk?: (chunk: string) => void,
  onToolCall?: (name: string) => void
): Promise<AgentResponse> {
  const now = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const relevantMemories = await getRelevantMemories(messages);
  const memoryContext = formatMemoryContext(relevantMemories);
  const systemPrompt = getSystemPrompt(now.toISOString(), timezone, memoryContext);

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
      ...(m.toolCalls ? { tool_calls: m.toolCalls } : {}),
    })),
  ];

  const response = await chatCompletion(
    apiKey,
    chatModel,
    apiMessages,
    AGENT_TOOLS,
    temperature,
    onChunk
  );

  const assistantMessage = response.choices[0]?.message;
  if (!assistantMessage) {
    return { content: 'No response from AI.', toolCalls: [] };
  }

  const toolCalls = assistantMessage.tool_calls;
  const toolCallResults: { name: string; result: string }[] = [];

  if (toolCalls && toolCalls.length > 0) {
    for (const tc of toolCalls) {
      if (onToolCall) onToolCall(tc.function.name);

      let args: Record<string, unknown>;
      try {
        args = JSON.parse(tc.function.arguments);
      } catch {
        toolCallResults.push({ name: tc.function.name, result: 'Invalid arguments' });
        continue;
      }

      const result = await executeTool(tc.function.name, args);
      toolCallResults.push({ name: tc.function.name, result: result.result });
    }

    const toolMessages = toolCalls.map((tc, i) => ({
      role: 'tool' as const,
      content: toolCallResults[i].result,
      tool_call_id: tc.id,
      name: tc.function.name,
    }));

    const followUpMessages = [...apiMessages, { ...assistantMessage, content: assistantMessage.content || '' }, ...toolMessages];

    const followUpResponse = await chatCompletion(
      apiKey,
      chatModel,
      followUpMessages,
      undefined,
      temperature,
      onChunk
    );

    const finalContent = followUpResponse.choices[0]?.message?.content ?? '';

    const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
    if (lastUserMessage) {
      const extracted = await extractMemories(
        apiKey,
        extractionModel,
        lastUserMessage.content,
        0.3
      );
      if (extracted.length > 0) {
        await saveExtractedMemories(extracted);
      }
    }

    return { content: finalContent, toolCalls: toolCallResults };
  }

  const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
  if (lastUserMessage) {
    const extracted = await extractMemories(
      apiKey,
      extractionModel,
      lastUserMessage.content,
      0.3
    );
    if (extracted.length > 0) {
      await saveExtractedMemories(extracted);
    }
  }

  return {
    content: assistantMessage.content ?? '',
    toolCalls: [],
  };
}

async function getRelevantMemories(messages: ChatMessage[]): Promise<any[]> {
  const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
  if (!lastUserMessage) return [];

  const relevant = await searchMemories(lastUserMessage.content, { limit: 5 });
  if (relevant.length > 0) return relevant;

  const recent = await listMemories({ limit: 3 });
  return recent;
}

function formatMemoryContext(memories: any[]): string {
  if (memories.length === 0) return 'No existing memories.';

  return memories
    .map(
      (m) =>
        `- [${m.type}] ${m.title} (${m.domain}, updated: ${m.updatedAt.toISOString().split('T')[0]}): ${m.content}`
    )
    .join('\n');
}
