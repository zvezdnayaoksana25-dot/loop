import { useState, type KeyboardEvent } from 'react';
import { Send, Sparkles, Plus } from 'lucide-react';

interface ChatInputProps {
  onSend: (content: string) => void;
  onAnalyze: () => void;
  onNewChat: () => void;
  isProcessing: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function ChatInput({ onSend, onAnalyze, onNewChat, isProcessing, inputRef }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim() && !isProcessing) {
      onSend(value.trim());
      setValue('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] px-3 py-2">
        <button
          onClick={onNewChat}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors shrink-0"
          title="New chat"
        >
          <Plus size={18} color="var(--text-secondary)" />
        </button>
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-[var(--text-primary)] text-sm resize-none outline-none placeholder:text-[var(--text-tertiary)] max-h-[120px]"
          rows={1}
          disabled={isProcessing}
        />
        <button
          onClick={onAnalyze}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors shrink-0"
          title="Analyze memories"
        >
          <Sparkles size={18} color="var(--accent)" />
        </button>
        <button
          onClick={handleSend}
          disabled={!value.trim() || isProcessing}
          className={`p-2 rounded-full transition-all shrink-0 ${
            value.trim() && !isProcessing
              ? 'bg-[var(--accent)] animate-glow'
              : 'bg-[var(--bg-tertiary)]'
          }`}
        >
          <Send size={16} color={value.trim() && !isProcessing ? 'white' : 'var(--text-tertiary)'} />
        </button>
      </div>
    </div>
  );
}
