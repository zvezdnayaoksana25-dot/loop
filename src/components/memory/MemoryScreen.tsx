import { useEffect } from 'react';
import { List, Network } from 'lucide-react';
import { useMemory } from '../../hooks/useMemory';
import { MemoryList } from './MemoryList';
import { MemoryGraph } from './MemoryGraph';
import { MemoryEditor } from './MemoryEditor';
import { DomainFilter } from './DomainFilter';
import { MemorySearch } from './MemorySearch';

export function MemoryScreen() {
  const {
    memories,
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
    editMemory,
    removeMemory,
    selectMemory,
    setSelectedMemory,
  } = useMemory();

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  return (
    <div className="h-full flex flex-col bg-[var(--bg-primary)]">
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">Memory</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-[var(--bg-tertiary)] text-[var(--accent)]'
                : 'text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'graph'
                ? 'bg-[var(--bg-tertiary)] text-[var(--accent)]'
                : 'text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <Network size={18} />
          </button>
        </div>
      </header>

      <div className="px-4 py-3 space-y-3">
        <MemorySearch value={searchQuery} onChange={setSearchQuery} />
        <DomainFilter
          activeDomain={activeDomain}
          activeType={activeType}
          onDomainChange={setActiveDomain}
          onTypeChange={setActiveType}
        />
        <p className="text-xs text-[var(--text-tertiary)]">
          {totalCount} memories total
          {memories.length !== totalCount && ` · ${memories.length} shown`}
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        {viewMode === 'list' ? (
          <MemoryList
            memories={memories}
            onSelect={selectMemory}
          />
        ) : (
          <MemoryGraph memories={memories} />
        )}
      </div>

      {selectedMemory && (
        <MemoryEditor
          memory={selectedMemory}
          onSave={(updates) => selectedMemory.id && editMemory(selectedMemory.id, updates)}
          onDelete={() => selectedMemory.id && removeMemory(selectedMemory.id)}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </div>
  );
}
