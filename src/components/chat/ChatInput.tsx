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
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  };

  return (
    <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] px-2 py-1.5">
      <button
        onClick={onNewChat}
        className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors shrink-0"
        title="New chat"
      >
        <Plus size={16} color="var(--text-secondary)" />
      </button>
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Message..."
        className="flex-1 bg-transparent text-[var(--text-primary)] text-sm resize-none outline-none placeholder:text-[var(--text-tertiary)] max-h-[100px] py-1"
        rows={1}
        disabled={isProcessing}
      />
      <button
        onClick={onAnalyze}
        className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors shrink-0"
        title="Analyze"
      >
        <Sparkles size={16} color="var(--accent)" />
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
        <Send size={14} color={value.trim() && !isProcessing ? 'white' : 'var(--text-tertiary)'} />
      </button>
    </div>
  );
}
