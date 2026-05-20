import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';
import { ToolCallIndicator } from './ToolCallIndicator';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  activeToolCalls: string[];
  isProcessing: boolean;
}

export function MessageList({ messages, activeToolCalls, isProcessing }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, activeToolCalls]);

  if (messages.length === 0 && !isProcessing) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Your Second Brain</h2>
          <p className="text-[var(--text-secondary)] text-sm max-w-xs">
            I remember everything you tell me. Start a conversation and I will build your knowledge base.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto px-4 py-3 space-y-3"
        style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {activeToolCalls.length > 0 && (
          <ToolCallIndicator toolCalls={activeToolCalls} />
        )}

        {isProcessing && activeToolCalls.length === 0 && (
          <TypingIndicator />
        )}

        <div className="h-2" />
      </div>
    </div>
  );
}
