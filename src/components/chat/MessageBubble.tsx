import type { ChatMessage } from '../../types';
import { formatTime } from '../../utils/time';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[85%]">
          <div className="px-3 py-2 rounded-2xl rounded-tr-sm bg-[var(--bubble-user)] text-white">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] text-right mt-0.5">
            {formatTime(new Date(message.timestamp))}
          </p>
        </div>
      </div>
    );
  }

  if (message.role === 'tool') {
    return null;
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-[90%]">
        <div className="px-1 py-0.5">
          <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
          {formatTime(new Date(message.timestamp))}
        </p>
      </div>
    </div>
  );
}
