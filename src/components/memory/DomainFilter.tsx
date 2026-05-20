import type { MemoryDomain } from '../../types';
import { DOMAIN_LABELS, DOMAIN_COLORS } from '../../utils/constants';

interface DomainFilterProps {
  activeDomain: MemoryDomain | 'all';
  onDomainChange: (domain: MemoryDomain | 'all') => void;
}

export function DomainFilter({
  activeDomain,
  onDomainChange,
}: DomainFilterProps) {
  const domains: (MemoryDomain | 'all')[] = ['all', 'work', 'learning', 'health', 'personal', 'finance', 'goals', 'tech', 'general'];

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1" style={{ WebkitOverflowScrolling: 'touch' }}>
      {domains.map((domain) => {
        const isActive = activeDomain === domain;
        const color = domain === 'all' ? undefined : DOMAIN_COLORS[domain];
        return (
          <button
            key={domain}
            onClick={() => onDomainChange(domain)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 min-h-[32px]"
            style={
              isActive
                ? domain === 'all'
                  ? { backgroundColor: 'var(--accent)', color: 'white' }
                  : { backgroundColor: color, color: 'white' }
                : { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }
            }
          >
            {domain === 'all' ? 'All' : DOMAIN_LABELS[domain]}
          </button>
        );
      })}
    </div>
  );
}
