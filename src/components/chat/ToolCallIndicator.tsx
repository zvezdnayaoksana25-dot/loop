import { Brain } from 'lucide-react';

interface ToolCallIndicatorProps {
  toolCalls: string[];
}

export function ToolCallIndicator({ toolCalls }: ToolCallIndicatorProps) {
  return (
    <div className="space-y-1 animate-fade-in">
      {toolCalls.map((tool, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--bg-secondary)]/50 border-l-2 border-[var(--accent)]"
        >
          <Brain size={14} color="var(--accent)" className="animate-pulse-slow shrink-0" />
          <span className="text-xs text-[var(--text-secondary)] truncate">
            {tool.replace(/_/g, ' ')}
          </span>
        </div>
      ))}
    </div>
  );
}
