import type { Memory } from '../../types';
import { formatTimestamp } from '../../utils/time';
import { DOMAIN_COLORS, DOMAIN_LABELS } from '../../utils/constants';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

export function MemoryCard({ memory, onClick }: MemoryCardProps) {
  const typeIcons: Record<string, string> = {
    episodic: '📅',
    semantic: '📝',
    procedural: '⚡',
  };

  const domainColor = DOMAIN_COLORS[memory.domain] || DOMAIN_COLORS.general;
  const typeIcon = typeIcons[memory.type] || '📝';

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-active)] transition-all min-h-[44px]"
    >
      <div className="flex items-start gap-2.5">
        <span className="text-base mt-0.5">{typeIcon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-[var(--text-primary)] truncate">
            {memory.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-0.5 mb-1.5">
            {memory.content}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: domainColor + '20',
                color: domainColor,
              }}
            >
              {DOMAIN_LABELS[memory.domain]}
            </span>
            <span className="text-xs text-[var(--text-tertiary)]">
              {memory.type}
            </span>
            {memory.tags.length > 0 && (
              <span className="text-xs text-[var(--accent)] truncate">
                {memory.tags.slice(0, 3).map((t) => '#' + t).join(' ')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-sm"
                  style={{
                    backgroundColor: i < memory.importance ? 'var(--accent)' : 'var(--bg-tertiary)',
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-[var(--text-tertiary)]">
              {formatTimestamp(new Date(memory.updatedAt))}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
