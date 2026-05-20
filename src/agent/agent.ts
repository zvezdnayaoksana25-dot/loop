import { chatCompletion } from './groq';
import { getSystemPrompt } from './prompts';
import { extractMemories, saveExtractedMemories } from './memory-extractor';
import { searchMemories, listMemories } from '../db/memories';
import type { ChatMessage } from '../types';

export interface AgentResponse {
  content: string;
  toolCalls: { name: string; result: string }[];
}

export async function runAgent(
  apiKey: string,
  chatModel: string,
  extractionModel: string,
  messages: ChatMessage[],
  temperature: number = 0.7,
  _onToolCall?: (name: string) => void
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
    })),
  ];

  console.log('Groq request:', chatModel, 'messages:', apiMessages.length);

  const response = await chatCompletion(
    apiKey,
    chatModel,
    apiMessages,
    undefined,
    temperature
  );

  const assistantMessage = response.choices[0]?.message;
  if (!assistantMessage || !assistantMessage.content) {
    console.error('Empty response from Groq:', JSON.stringify(response));
    return { content: 'No response from AI.', toolCalls: [] };
  }

  console.log('Got content, length:', assistantMessage.content.length);

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
    content: assistantMessage.content,
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
