import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';
import { ToolCallIndicator } from './ToolCallIndicator';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  streamingContent: string;
  activeToolCalls: string[];
  isProcessing: boolean;
}

export function MessageList({ messages, streamingContent, activeToolCalls, isProcessing }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, streamingContent, activeToolCalls]);

  if (messages.length === 0 && !streamingContent) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Your Second Brain</h2>
          <p className="text-[var(--text-secondary)] text-sm max-w-xs">
            I remember everything you tell me. Start a conversation and I'll build your knowledge base.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full overflow-y-auto px-4 py-4 space-y-4">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}

      {activeToolCalls.length > 0 && (
        <ToolCallIndicator toolCalls={activeToolCalls} />
      )}

      {streamingContent && (
        <div className="animate-fade-in">
          <div className="text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
            {streamingContent}
            <span className="inline-block w-0.5 h-5 bg-[var(--accent)] ml-0.5 animate-pulse" />
          </div>
        </div>
      )}

      {isProcessing && !streamingContent && activeToolCalls.length === 0 && (
        <TypingIndicator />
      )}

      <div className="h-4" />
    </div>
  );
}
