import { useState } from 'react';
import { X, Plus, Trash2, MessageSquare } from 'lucide-react';
import type { Chat } from '../../types';
import { formatTimestamp } from '../../utils/time';

interface ChatHistoryDrawerProps {
  chats: Chat[];
  currentChatId?: number;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onNew: () => void;
  onClose: () => void;
}

export function ChatHistoryDrawer({
  chats,
  currentChatId,
  onSelect,
  onDelete,
  onNew,
  onClose,
}: ChatHistoryDrawerProps) {
  const [search, setSearch] = useState('');

  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Chat[]>>((acc, chat) => {
    const date = new Date(chat.updatedAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let group: string;
    if (days === 0) group = 'Today';
    else if (days === 1) group = 'Yesterday';
    else if (days < 7) group = 'This week';
    else if (days < 30) group = 'This month';
    else group = 'Older';

    if (!acc[group]) acc[group] = [];
    acc[group].push(chat);
    return acc;
  }, {});

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />
      <div
        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[var(--bg-secondary)] z-50 animate-slide-in-left flex flex-col"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Chat History</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]">
            <X size={20} color="var(--text-primary)" />
          </button>
        </div>

        <div className="px-4 py-3">
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {Object.entries(grouped).map(([group, groupChats]) => (
            <div key={group} className="mb-4">
              <p className="text-xs text-[var(--text-secondary)] font-medium mb-2 uppercase tracking-wide">
                {group}
              </p>
              <div className="space-y-1">
                {groupChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      chat.id === currentChatId
                        ? 'bg-[var(--bg-tertiary)] border-l-2 border-[var(--accent)]'
                        : 'hover:bg-[var(--bg-tertiary)]/50'
                    }`}
                    onClick={() => chat.id && onSelect(chat.id)}
                  >
                    <MessageSquare size={16} color="var(--text-secondary)" className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)] truncate">{chat.title}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        {formatTimestamp(new Date(chat.updatedAt))}
                      </p>
                    </div>
                    {chat.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(chat.id!);
                        }}
                        className="p-1 rounded hover:bg-[var(--bg-elevated)] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} color="var(--error)" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare size={32} color="var(--text-tertiary)" className="mx-auto mb-2" />
              <p className="text-sm text-[var(--text-tertiary)]">No chats yet</p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-[var(--border)]">
          <button
            onClick={onNew}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--accent)] rounded-lg text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>
      </div>
    </>
  );
}
