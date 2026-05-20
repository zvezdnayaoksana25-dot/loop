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
    <div
      className="w-full flex flex-col bg-[var(--bg-primary)]"
      style={{
        height: '100dvh',
        paddingTop: 'var(--sat)',
        paddingLeft: 'var(--sal)',
        paddingRight: 'var(--sar)',
      }}
    >
      <div className="flex-1 overflow-hidden min-h-0">
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

      <nav
        className="flex shrink-0 border-t border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-xl"
        style={{
          paddingBottom: 'calc(var(--sab) + 8px)',
          paddingTop: '8px',
        }}
      >
        <button
          onClick={() => setActiveTab('chat')}
          className="relative flex-1 flex flex-col items-center justify-center py-2 transition-colors duration-150"
        >
          <MessageSquare size={22} color={activeTab === 'chat' ? 'var(--accent)' : 'var(--text-tertiary)'} />
          <span
            className="text-xs mt-0.5 font-medium"
            style={{ color: activeTab === 'chat' ? 'var(--accent)' : 'var(--text-tertiary)' }}
          >
            Chat
          </span>
          {activeTab === 'chat' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--accent)] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className="relative flex-1 flex flex-col items-center justify-center py-2 transition-colors duration-150"
        >
          <Brain size={22} color={activeTab === 'memory' ? 'var(--accent)' : 'var(--text-tertiary)'} />
          <span
            className="text-xs mt-0.5 font-medium"
            style={{ color: activeTab === 'memory' ? 'var(--accent)' : 'var(--text-tertiary)' }}
          >
            Memory
          </span>
          {activeTab === 'memory' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--accent)] rounded-full" />
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
