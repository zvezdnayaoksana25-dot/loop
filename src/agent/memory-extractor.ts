import { chatCompletion } from './groq';
import { createMemory, searchMemories, mergeMemories, listMemories, updateMemory, getMemory, deleteMemory } from '../db/memories';
import type { Memory } from '../types';
import { EXTRACTION_PROMPT } from './prompts';

export interface ExtractedMemory {
  type: 'episodic' | 'semantic' | 'procedural';
  domain: 'work' | 'learning' | 'health' | 'personal' | 'finance' | 'goals' | 'tech' | 'general';
  title: string;
  content: string;
  tags: string[];
  importance: number;
}

export async function extractMemories(
  apiKey: string,
  model: string,
  conversationText: string,
  temperature: number = 0.3
): Promise<ExtractedMemory[]> {
  try {
    const response = await chatCompletion(
      apiKey,
      model,
      [
        { role: 'system', content: EXTRACTION_PROMPT },
        { role: 'user', content: conversationText },
      ],
      undefined,
      temperature
    );

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const extracted: ExtractedMemory[] = JSON.parse(jsonMatch[0]);
    return extracted.filter(
      (m) => m.type && m.domain && m.title && m.content && m.importance
    );
  } catch {
    return [];
  }
}

export async function saveExtractedMemories(
  memories: ExtractedMemory[],
  sourceChatId?: number
): Promise<number[]> {
  const savedIds: number[] = [];

  for (const memory of memories) {
    const similar = await searchMemories(memory.title, { limit: 3 });
    const hasOverlap = similar.some((m) => {
      const overlap = calculateOverlap(memory.content, m.content);
      return overlap > 0.7;
    });

    if (hasOverlap && similar.length > 0) {
      const existing = similar[0];
      await updateMemory(existing.id!, {
        content: memory.content,
        title: memory.title,
        importance: Math.max(existing.importance, memory.importance),
        tags: [...new Set([...existing.tags, ...memory.tags])],
        updatedAt: new Date(),
      });
      savedIds.push(existing.id!);
    } else {
      const id = await createMemory({
        ...memory,
        source: 'agent',
        sourceChatId,
        confidence: 0.8,
        relatedIds: similar.map((m) => m.id!).filter(Boolean),
      });
      savedIds.push(id);
    }
  }

  return savedIds;
}

export async function autoConsolidate(_apiKey: string, _model: string): Promise<void> {
  const memories = await listMemories({ limit: 100 });
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const oldEpisodic = memories.filter(
    (m) => m.type === 'episodic' && m.updatedAt < sevenDaysAgo && m.importance >= 5
  );

  const processed = new Set<number>();

  for (const memory of oldEpisodic) {
    if (processed.has(memory.id!)) continue;

    const similar = memories.filter(
      (m) =>
        m.id !== memory.id &&
        !processed.has(m.id!) &&
        m.domain === memory.domain &&
        calculateOverlap(memory.content, m.content) > 0.6
    );

    if (similar.length > 0) {
      const allIds = [memory.id!, ...similar.map((m) => m.id!)];
      const mergedContent = [memory.content, ...similar.map((m) => m.content)].join('\n\n');
      const mergedTitle = memory.title;

      await mergeMemories(allIds, mergedContent, mergedTitle);
      allIds.forEach((id) => processed.add(id));
    }
  }
}

function calculateOverlap(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));

  let overlap = 0;
  for (const word of words1) {
    if (words2.has(word)) overlap++;
  }

  return overlap / Math.max(words1.size, words2.size);
}

export interface ToolResult {
  toolName: string;
  result: string;
  success: boolean;
}

export async function executeTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<ToolResult> {
  try {
    switch (toolName) {
      case 'create_memory': {
        const { type, domain, title, content, tags, importance } = args as {
          type: Memory['type'];
          domain: Memory['domain'];
          title: string;
          content: string;
          tags?: string[];
          importance: number;
        };
        const id = await createMemory({
          type,
          domain,
          title,
          content,
          tags: tags || [],
          source: 'agent',
          importance,
          confidence: 0.8,
          relatedIds: [],
        });
        return { toolName, result: `Memory created with ID: ${id}`, success: true };
      }

      case 'update_memory': {
        const { id, title, content, importance, tags } = args as {
          id: number;
          title?: string;
          content?: string;
          importance?: number;
          tags?: string[];
        };
        const updates: Partial<Memory> = {};
        if (title) updates.title = title;
        if (content) updates.content = content;
        if (importance) updates.importance = importance;
        if (tags) updates.tags = tags;
        await updateMemory(id, updates);
        return { toolName, result: `Memory ${id} updated`, success: true };
      }

      case 'delete_memory': {
        const { id } = args as { id: number };
        await deleteMemory(id);
        return { toolName, result: `Memory ${id} deleted`, success: true };
      }

      case 'search_memories': {
        const { query, domain, type, limit } = args as {
          query: string;
          domain?: Memory['domain'];
          type?: Memory['type'];
          limit?: number;
        };
        const results = await searchMemories(query, { domain, type, limit: limit || 10 });
        return {
          toolName,
          result: formatMemories(results),
          success: true,
        };
      }

      case 'list_memories': {
        const { domain, type, minImportance, limit } = args as {
          domain?: Memory['domain'];
          type?: Memory['type'];
          minImportance?: number;
          limit?: number;
        };
        const results = await listMemories({ domain, type, minImportance, limit: limit || 20 });
        return {
          toolName,
          result: formatMemories(results),
          success: true,
        };
      }

      case 'merge_memories': {
        const { ids, mergedTitle, mergedContent } = args as {
          ids: number[];
          mergedTitle: string;
          mergedContent: string;
        };
        const newId = await mergeMemories(ids, mergedContent, mergedTitle);
        return { toolName, result: `Merged ${ids.length} memories into new memory ID: ${newId}`, success: true };
      }

      case 'read_memory': {
        const { id } = args as { id: number };
        const memory = await getMemory(id);
        if (!memory) return { toolName, result: `Memory ${id} not found`, success: false };
        return {
          toolName,
          result: formatMemory(memory),
          success: true,
        };
      }

      case 'recall_relevant': {
        const { query, limit } = args as { query: string; limit?: number };
        const results = await searchMemories(query, { limit: limit || 5 });
        return {
          toolName,
          result: results.length > 0 ? formatMemories(results) : 'No relevant memories found.',
          success: true,
        };
      }

      default:
        return { toolName, result: `Unknown tool: ${toolName}`, success: false };
    }
  } catch (error) {
    return {
      toolName,
      result: `Error executing ${toolName}: ${error instanceof Error ? error.message : String(error)}`,
      success: false,
    };
  }
}

function formatMemory(memory: Memory): string {
  return `[ID:${memory.id}] ${memory.title} (${memory.type}, ${memory.domain}, importance:${memory.importance})\n${memory.content}\nCreated: ${memory.createdAt.toISOString()}\nUpdated: ${memory.updatedAt.toISOString()}`;
}

function formatMemories(memories: Memory[]): string {
  if (memories.length === 0) return 'No memories found.';
  return memories.map((m) => formatMemory(m)).join('\n\n---\n\n');
}
