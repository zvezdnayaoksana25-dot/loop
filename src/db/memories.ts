import { db } from './database';
import type { Memory, MemoryDomain, MemoryType } from '../types';

export async function createMemory(memory: Omit<Memory, 'id' | 'createdAt' | 'updatedAt' | 'lastAccessedAt' | 'accessCount' | 'version' | 'mergedFromIds' | 'contradictionHistory'>): Promise<number> {
  const now = new Date();
  return db.memories.add({
    ...memory,
    createdAt: now,
    updatedAt: now,
    lastAccessedAt: now,
    accessCount: 0,
    version: 1,
    mergedFromIds: [],
    contradictionHistory: [],
  });
}

export async function getMemory(id: number): Promise<Memory | undefined> {
  const memory = await db.memories.get(id);
  if (memory) {
    await db.memories.update(id, {
      lastAccessedAt: new Date(),
      accessCount: memory.accessCount + 1,
    });
  }
  return memory;
}

export async function updateMemory(id: number, updates: Partial<Memory>): Promise<void> {
  await db.memories.update(id, {
    ...updates,
    updatedAt: new Date(),
    version: (await getMemory(id))!.version + 1,
  });
}

export async function deleteMemory(id: number): Promise<void> {
  await db.memories.delete(id);
}

export async function listMemories(options?: {
  type?: MemoryType;
  domain?: MemoryDomain;
  minImportance?: number;
  limit?: number;
  offset?: number;
}): Promise<Memory[]> {
  let collection = db.memories.orderBy('updatedAt').reverse();

  if (options?.type) {
    collection = db.memories.where('type').equals(options.type).reverse();
  }
  if (options?.domain) {
    collection = db.memories.where('domain').equals(options.domain).reverse();
  }
  if (options?.minImportance) {
    collection = db.memories.where('importance').aboveOrEqual(options.minImportance).reverse();
  }

  if (options?.offset) {
    collection = collection.offset(options.offset);
  }
  if (options?.limit) {
    collection = collection.limit(options.limit);
  }

  return collection.toArray();
}

export async function searchMemories(query: string, options?: {
  type?: MemoryType;
  domain?: MemoryDomain;
  limit?: number;
}): Promise<Memory[]> {
  const lowerQuery = query.toLowerCase();
  const allMemories = await listMemories({
    type: options?.type,
    domain: options?.domain,
    limit: options?.limit || 50,
  });

  return allMemories
    .filter((m) =>
      m.title.toLowerCase().includes(lowerQuery) ||
      m.content.toLowerCase().includes(lowerQuery) ||
      m.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    )
    .slice(0, options?.limit || 20);
}

export async function mergeMemories(ids: number[], mergedContent: string, mergedTitle: string): Promise<number> {
  const memories = await Promise.all(ids.map((id) => getMemory(id)));
  const validMemories = memories.filter(Boolean) as Memory[];

  const allRelatedIds = [...new Set(validMemories.flatMap((m) => m.relatedIds).filter((id) => !ids.includes(id)))];
  const allTags = [...new Set(validMemories.flatMap((m) => m.tags))];
  const maxImportance = Math.max(...validMemories.map((m) => m.importance));
  const avgConfidence = validMemories.reduce((sum, m) => sum + m.confidence, 0) / validMemories.length;

  const newId = await createMemory({
    type: validMemories[0].type,
    domain: validMemories[0].domain,
    title: mergedTitle,
    content: mergedContent,
    tags: allTags,
    relatedIds: allRelatedIds,
    source: 'agent',
    importance: maxImportance,
    confidence: avgConfidence,
  });

  await db.memories.update(newId, {
    mergedFromIds: ids,
  });

  await Promise.all(ids.map((id) => deleteMemory(id)));

  return newId;
}

export async function getMemoriesByDomain(domain: MemoryDomain): Promise<Memory[]> {
  return db.memories.where('domain').equals(domain).reverse().toArray();
}

export async function getRecentMemories(limit: number = 20): Promise<Memory[]> {
  return db.memories.orderBy('updatedAt').reverse().limit(limit).toArray();
}

export async function getMemoryCount(): Promise<number> {
  return db.memories.count();
}
