import { useState, useCallback, useEffect } from 'react';
import type { Memory, MemoryDomain, MemoryType } from '../types';
import {
  createMemory,
  getMemory,
  updateMemory,
  deleteMemory,
  listMemories,
  mergeMemories,
  getMemoryCount,
} from '../db/memories';

export function useMemory() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomain, setActiveDomain] = useState<MemoryDomain | 'all'>('all');
  const [activeType, setActiveType] = useState<MemoryType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [totalCount, setTotalCount] = useState(0);

  const loadMemories = useCallback(async () => {
    const all = await listMemories({ limit: 200 });
    setMemories(all);
    const count = await getMemoryCount();
    setTotalCount(count);
  }, []);

  useEffect(() => {
    let filtered = memories;

    if (activeDomain !== 'all') {
      filtered = filtered.filter((m) => m.domain === activeDomain);
    }
    if (activeType !== 'all') {
      filtered = filtered.filter((m) => m.type === activeType);
    }
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(lower) ||
          m.content.toLowerCase().includes(lower) ||
          m.tags.some((t) => t.toLowerCase().includes(lower))
      );
    }

    setFilteredMemories(filtered);
  }, [memories, activeDomain, activeType, searchQuery]);

  const createNewMemory = useCallback(
    async (memory: Omit<Memory, 'id' | 'createdAt' | 'updatedAt' | 'lastAccessedAt' | 'accessCount' | 'version' | 'mergedFromIds' | 'contradictionHistory'>) => {
      await createMemory(memory);
      await loadMemories();
    },
    [loadMemories]
  );

  const editMemory = useCallback(
    async (id: number, updates: Partial<Memory>) => {
      await updateMemory(id, updates);
      await loadMemories();
      if (selectedMemory?.id === id) {
        const updated = await getMemory(id);
        setSelectedMemory(updated || null);
      }
    },
    [loadMemories, selectedMemory]
  );

  const removeMemory = useCallback(
    async (id: number) => {
      await deleteMemory(id);
      if (selectedMemory?.id === id) setSelectedMemory(null);
      await loadMemories();
    },
    [loadMemories, selectedMemory]
  );

  const mergeSelectedMemories = useCallback(
    async (ids: number[], mergedTitle: string, mergedContent: string) => {
      await mergeMemories(ids, mergedContent, mergedTitle);
      setSelectedMemory(null);
      await loadMemories();
    },
    [loadMemories]
  );

  const selectMemory = useCallback(async (id: number) => {
    const memory = await getMemory(id);
    setSelectedMemory(memory || null);
  }, []);

  return {
    memories: filteredMemories,
    selectedMemory,
    searchQuery,
    activeDomain,
    activeType,
    viewMode,
    totalCount,
    setSearchQuery,
    setActiveDomain,
    setActiveType,
    setViewMode,
    loadMemories,
    createNewMemory,
    editMemory,
    removeMemory,
    mergeSelectedMemories,
    selectMemory,
    setSelectedMemory,
  };
}
