import type { MemoryDomain, MemoryType } from '../../types';
import { DOMAIN_LABELS, DOMAIN_COLORS } from '../../utils/constants';

interface DomainFilterProps {
  activeDomain: MemoryDomain | 'all';
  activeType: MemoryType | 'all';
  onDomainChange: (domain: MemoryDomain | 'all') => void;
  onTypeChange: (type: MemoryType | 'all') => void;
}

export function DomainFilter({
  activeDomain,
  activeType,
  onDomainChange,
  onTypeChange,
}: DomainFilterProps) {
  const domains: (MemoryDomain | 'all')[] = ['all', 'work', 'learning', 'health', 'personal', 'finance', 'goals', 'tech', 'general'];
  const types: (MemoryType | 'all')[] = ['all', 'episodic', 'semantic', 'procedural'];

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
        {domains.map((domain) => {
          const isActive = activeDomain === domain;
          const color = domain === 'all' ? undefined : DOMAIN_COLORS[domain];
          return (
            <button
              key={domain}
              onClick={() => onDomainChange(domain)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? domain === 'all'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
              }`}
              style={isActive && domain !== 'all' && color ? { backgroundColor: color } : {}}
            >
              {domain === 'all' ? 'All' : DOMAIN_LABELS[domain]}
            </button>
          );
        })}
      </div>
      <div className="flex gap-1.5">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activeType === type
                ? 'bg-[var(--bg-tertiary)] text-[var(--accent)] border border-[var(--border-active)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {type === 'all' ? 'All types' : type}
          </button>
        ))}
      </div>
    </div>
  );
}
