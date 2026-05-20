import { useState } from 'react';
import { MessageSquare, Brain } from 'lucide-react';
import { ChatScreen } from '../chat/ChatScreen';
import { MemoryScreen } from '../memory/MemoryScreen';
import { SettingsModal } from '../shared/SettingsModal';

type Tab = 'chat' | 'memory';

interface AppLayoutProps {
  apiKey: string;
  chatModel: string;
  extractionModel: string;
  temperature: number;
  autoMemoryExtraction: boolean;
  autoConsolidation: boolean;
  insightFrequency: number;
  onUpdateSetting: (key: string, value: unknown) => void;
}

export function AppLayout({
  apiKey,
  chatModel,
  extractionModel,
  temperature,
  autoMemoryExtraction,
  autoConsolidation,
  insightFrequency,
  onUpdateSetting,
}: AppLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-full w-full flex flex-col bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <ChatScreen
            apiKey={apiKey}
            chatModel={chatModel}
            extractionModel={extractionModel}
            temperature={temperature}
            insightFrequency={insightFrequency}
            onOpenSettings={() => setShowSettings(true)}
          />
        ) : (
          <MemoryScreen />
        )}
      </div>

      <nav className="flex border-t border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors duration-150 ${
            activeTab === 'chat'
              ? 'text-[var(--accent)]'
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <MessageSquare size={22} />
          <span className="text-xs mt-1 font-medium">Chat</span>
          {activeTab === 'chat' && (
            <div className="absolute bottom-0 w-12 h-0.5 bg-[var(--accent)] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors duration-150 ${
            activeTab === 'memory'
              ? 'text-[var(--accent)]'
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <Brain size={22} />
          <span className="text-xs mt-1 font-medium">Memory</span>
          {activeTab === 'memory' && (
            <div className="absolute bottom-0 w-12 h-0.5 bg-[var(--accent)] rounded-full" />
          )}
        </button>
      </nav>

      {showSettings && (
        <SettingsModal
          apiKey={apiKey}
          chatModel={chatModel}
          extractionModel={extractionModel}
          temperature={temperature}
          autoMemoryExtraction={autoMemoryExtraction}
          autoConsolidation={autoConsolidation}
          insightFrequency={insightFrequency}
          onUpdateSetting={onUpdateSetting}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
