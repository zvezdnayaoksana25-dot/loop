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
    viewMode,
    totalCount,
    setSearchQuery,
    setActiveDomain,
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
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] shrink-0">
        <h1 className="text-base font-semibold text-[var(--text-primary)]">Memory</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('list')}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg transition-colors"
            style={{ backgroundColor: viewMode === 'list' ? 'var(--bg-tertiary)' : 'transparent', color: viewMode === 'list' ? 'var(--accent)' : 'var(--text-tertiary)' }}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg transition-colors"
            style={{ backgroundColor: viewMode === 'graph' ? 'var(--bg-tertiary)' : 'transparent', color: viewMode === 'graph' ? 'var(--accent)' : 'var(--text-tertiary)' }}
          >
            <Network size={18} />
          </button>
        </div>
      </header>

      <div className="px-4 py-2.5 space-y-2.5 shrink-0">
        <MemorySearch value={searchQuery} onChange={setSearchQuery} />
        <DomainFilter
          activeDomain={activeDomain}
          onDomainChange={setActiveDomain}
        />
        <p className="text-xs text-[var(--text-tertiary)]">
          {totalCount} memories
          {memories.length !== totalCount && ' - ' + memories.length + ' shown'}
        </p>
      </div>

      <div className="flex-1 overflow-hidden min-h-0">
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
