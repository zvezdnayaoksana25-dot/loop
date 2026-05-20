import type { Memory } from '../../types';
import { MemoryCard } from './MemoryCard';

interface MemoryListProps {
  memories: Memory[];
  onSelect: (id: number) => void;
}

export function MemoryList({ memories, onSelect }: MemoryListProps) {
  if (memories.length === 0) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No memories yet</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Start chatting and I'll automatically build your knowledge base.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 pb-4 space-y-2">
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          onClick={() => memory.id && onSelect(memory.id)}
        />
      ))}
    </div>
  );
}
