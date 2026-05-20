import { Search } from 'lucide-react';

interface MemorySearchProps {
  value: string;
  onChange: (query: string) => void;
}

export function MemorySearch({ value, onChange }: MemorySearchProps) {
  return (
    <div className="relative">
      <Search size={14} color="var(--text-tertiary)" className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-8 pr-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-[var(--border-active)] placeholder:text-[var(--text-tertiary)]"
      />
    </div>
  );
}
