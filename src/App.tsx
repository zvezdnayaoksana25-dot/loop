import { useState, useEffect, useCallback } from 'react';
import { db } from './db/database';
import { DEFAULT_SETTINGS } from './types';
import { AppLayout } from './components/layout/AppLayout';
import { InstallPrompt } from './components/shared/InstallPrompt';
import { BackupBanner } from './components/shared/BackupBanner';
import { getDaysSinceLastBackup } from './db/export';
import { usePWA } from './hooks/usePWA';

function App() {
  const [settings, setSettings] = useState<Record<string, unknown>>(DEFAULT_SETTINGS);
  const [showBackupBanner, setShowBackupBanner] = useState(false);
  const [daysSinceBackup, setDaysSinceBackup] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showPrompt, install, dismiss: dismissInstall } = usePWA();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const allSettings = await db.settings.toArray();
    const loaded: Record<string, unknown> = { ...DEFAULT_SETTINGS };
    for (const setting of allSettings) {
      loaded[setting.key] = setting.value;
    }
    setSettings(loaded);
    setIsLoaded(true);

    const days = await getDaysSinceLastBackup();
    if (days !== null && days >= 3) {
      setDaysSinceBackup(days);
      setShowBackupBanner(true);
    }
  };

  const updateSetting = useCallback(async (key: string, value: unknown) => {
    await db.settings.put({ key, value, updatedAt: new Date() });
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-slow">🧠</div>
          <p className="text-sm text-[var(--text-secondary)]">Loading Second Brain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      {showBackupBanner && daysSinceBackup && (
        <BackupBanner
          daysSinceBackup={daysSinceBackup}
          onDismiss={() => setShowBackupBanner(false)}
        />
      )}

      <div className="flex-1 overflow-hidden">
        <AppLayout
          apiKey={settings.groqApiKey as string}
          chatModel={settings.chatModel as string}
          extractionModel={settings.extractionModel as string}
          temperature={settings.temperature as number}
          autoMemoryExtraction={settings.autoMemoryExtraction as boolean}
          autoConsolidation={settings.autoConsolidation as boolean}
          insightFrequency={settings.insightFrequency as number}
          onUpdateSetting={updateSetting}
        />
      </div>

      {showPrompt && (
        <InstallPrompt onInstall={install} onDismiss={dismissInstall} />
      )}
    </div>
  );
}

export default App;
