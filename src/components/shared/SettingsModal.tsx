import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Download, Upload, FileText, Trash2 } from 'lucide-react';
import { exportDatabase, importDatabase, exportAsMarkdown, getDaysSinceLastBackup, setLastBackupDate } from '../../db/export';
import { MODELS } from '../../utils/constants';
import { clearAllChats } from '../../db/chats';

interface SettingsModalProps {
  apiKey: string;
  chatModel: string;
  extractionModel: string;
  temperature: number;
  autoMemoryExtraction: boolean;
  autoConsolidation: boolean;
  insightFrequency: number;
  onUpdateSetting: (key: string, value: unknown) => void;
  onClose: () => void;
}

export function SettingsModal({
  apiKey,
  chatModel,
  extractionModel,
  temperature,
  autoMemoryExtraction,
  autoConsolidation,
  insightFrequency,
  onUpdateSetting,
  onClose,
}: SettingsModalProps) {
  const [showKey, setShowKey] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);
  const [daysSinceBackup, setDaysSinceBackup] = useState<number | null>(null);

  useEffect(() => {
    getDaysSinceLastBackup().then(setDaysSinceBackup);
  }, []);

  const handleSaveKey = () => {
    onUpdateSetting('groqApiKey', keyInput);
  };

  const handleExport = async () => {
    await exportDatabase();
    await setLastBackupDate(new Date().toISOString());
    setDaysSinceBackup(0);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await importDatabase(file);
    await setLastBackupDate(new Date().toISOString());
    setDaysSinceBackup(0);
    window.location.reload();
  };

  const handleExportMarkdown = async () => {
    await exportAsMarkdown();
    await setLastBackupDate(new Date().toISOString());
    setDaysSinceBackup(0);
  };

  const handleClearChats = async () => {
    if (confirm('Delete all chats? This cannot be undone.')) {
      await clearAllChats();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-x-2 bottom-2 top-2 sm:inset-10 bg-[var(--bg-primary)] rounded-2xl z-50 overflow-hidden flex flex-col animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-primary)] shrink-0">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Settings</h2>
          <button onClick={onClose} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)]">
            <X size={20} color="var(--text-primary)" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 py-4 space-y-5" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}>
          <section>
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">Groq API Key</h3>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full px-3 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] font-mono outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-tertiary)] pr-10"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  {showKey ? <EyeOff size={16} color="var(--text-tertiary)" /> : <Eye size={16} color="var(--text-tertiary)" />}
                </button>
              </div>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2.5 bg-[var(--accent)] rounded-lg text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors shrink-0"
              >
                Save
              </button>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
              Free tier: 30 RPM / 6K TPM
            </p>
          </section>

          <section>
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">Chat Model</h3>
            <select
              value={chatModel}
              onChange={(e) => onUpdateSetting('chatModel', e.target.value)}
              className="w-full px-3 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">Extraction Model</h3>
            <select
              value={extractionModel}
              onChange={(e) => onUpdateSetting('extractionModel', e.target.value)}
              className="w-full px-3 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Temperature: {temperature.toFixed(1)}
            </h3>
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={temperature}
              onChange={(e) => onUpdateSetting('temperature', Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
              <span>0.0</span>
              <span>2.0</span>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-primary)]">Auto Memory Extraction</span>
              <button
                onClick={() => onUpdateSetting('autoMemoryExtraction', !autoMemoryExtraction)}
                className="w-12 h-7 rounded-full transition-colors relative"
                style={{ backgroundColor: autoMemoryExtraction ? 'var(--accent)' : 'var(--bg-tertiary)' }}
              >
                <div
                  className="absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform"
                  style={{ transform: autoMemoryExtraction ? 'translateX(22px)' : 'translateX(2px)' }}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-primary)]">Auto Consolidation</span>
              <button
                onClick={() => onUpdateSetting('autoConsolidation', !autoConsolidation)}
                className="w-12 h-7 rounded-full transition-colors relative"
                style={{ backgroundColor: autoConsolidation ? 'var(--accent)' : 'var(--bg-tertiary)' }}
              >
                <div
                  className="absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform"
                  style={{ transform: autoConsolidation ? 'translateX(22px)' : 'translateX(2px)' }}
                />
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Insights: every {insightFrequency} messages
            </h3>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={insightFrequency}
              onChange={(e) => onUpdateSetting('insightFrequency', Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </section>

          <section>
            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2.5">Backup</h3>
            <div className="space-y-2">
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <Download size={16} color="var(--accent)" />
                Export JSON
              </button>
              <label className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
                <Upload size={16} color="var(--info)" />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExportMarkdown}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <FileText size={16} color="var(--success)" />
                Export Markdown
              </button>
            </div>
            {daysSinceBackup !== null && (
              <p className="text-xs text-[var(--text-tertiary)] mt-2">
                Last backup: {daysSinceBackup === 0 ? 'Today' : daysSinceBackup + 'd ago'}
              </p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-medium text-[var(--error)] mb-2.5">Danger Zone</h3>
            <button
              onClick={handleClearChats}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--error)]/30 rounded-lg text-sm text-[var(--error)] hover:bg-[var(--error)]/10 transition-colors"
            >
              <Trash2 size={16} />
              Clear All Chats
            </button>
          </section>

          <div className="h-6" />
          </div>
        </div>
      </div>
    </>
  );
}
