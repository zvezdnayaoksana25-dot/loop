import { useState } from 'react';
import { X, Trash2, Save } from 'lucide-react';
import type { Memory, MemoryDomain } from '../../types';
import { formatFullTimestamp } from '../../utils/time';
import { DOMAIN_COLORS, DOMAIN_LABELS } from '../../utils/constants';

interface MemoryEditorProps {
  memory: Memory;
  onSave: (updates: Partial<Memory>) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function MemoryEditor({ memory, onSave, onDelete, onClose }: MemoryEditorProps) {
  const [title, setTitle] = useState(memory.title);
  const [content, setContent] = useState(memory.content);
  const [importance, setImportance] = useState(memory.importance);
  const [tags, setTags] = useState(memory.tags.join(', '));

  const handleSave = () => {
    onSave({
      title,
      content,
      importance,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    onClose();
  };

  const domainColor = DOMAIN_COLORS[memory.domain] || DOMAIN_COLORS.general;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 animate-fade-in" onClick={onClose} />
      <div
        className="fixed inset-x-3 bottom-3 top-3 bg-[var(--bg-secondary)] rounded-2xl z-50 animate-slide-up overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] shrink-0">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Edit Memory</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={onDelete}
              className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <Trash2 size={16} color="var(--error)" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Save size={16} color="white" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <X size={16} color="var(--text-primary)" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div>
            <label className="text-xs text-[var(--text-secondary)] font-medium mb-1 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] font-medium mb-1.5 block">Type</label>
            <div className="flex gap-2">
              {(['episodic', 'semantic', 'procedural'] as const).map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    memory.type === type
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] font-medium mb-1.5 block">Domain</label>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(DOMAIN_LABELS) as MemoryDomain[]).map((domain) => (
                <button
                  key={domain}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    memory.domain === domain ? 'text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                  }`}
                  style={memory.domain === domain ? { backgroundColor: domainColor } : {}}
                >
                  {DOMAIN_LABELS[domain]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] font-medium mb-1 block">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] font-medium mb-1 block">
              Importance: {importance}
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] font-medium mb-1 block">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="#tag1, #tag2"
              className="w-full px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:ring-1 focus:ring-[var(--accent)] placeholder:text-[var(--text-tertiary)]"
            />
          </div>

          <div className="border-t border-[var(--border)] pt-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-tertiary)]">Created</span>
              <span className="text-[var(--text-secondary)]">
                {formatFullTimestamp(new Date(memory.createdAt))}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-tertiary)]">Updated</span>
              <span className="text-[var(--text-secondary)]">
                {formatFullTimestamp(new Date(memory.updatedAt))}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-tertiary)]">Version</span>
              <span className="text-[var(--text-secondary)]">{memory.version}</span>
            </div>
            {memory.mergedFromIds.length > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-[var(--text-tertiary)]">Merged from</span>
                <span className="text-[var(--text-secondary)]">
                  #{memory.mergedFromIds.join(', #')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
