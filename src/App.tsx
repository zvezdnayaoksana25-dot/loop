import { useState, useEffect } from 'react'
import type { Settings } from './types'
import { getSettings, saveSettings } from './db'
import { initGroq } from './groq/client'
import Chat from './components/Chat'
import GraphView from './components/GraphView'
import ExposureLadder from './components/ExposureLadder'
import SettingsView from './components/SettingsView'

type Tab = 'chat' | 'graph' | 'exposure' | 'settings'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'chat', label: 'Чат', icon: '💬' },
  { id: 'graph', label: 'Граф', icon: '🕸️' },
  { id: 'exposure', label: 'Exposure', icon: '🪜' },
  { id: 'settings', label: 'Настройки', icon: '⚙️' },
]

export default function App() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('chat')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const s = await getSettings()
    setSettings(s)
    if (s.groq_api_key) {
      initGroq(s.groq_api_key)
    }
    setLoading(false)
  }

  async function handleSettingsChange(newSettings: Settings) {
    await saveSettings(newSettings)
    setSettings(newSettings)
    if (newSettings.groq_api_key) {
      initGroq(newSettings.groq_api_key)
    }
  }

  if (loading || !settings) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--bg)]">
        <p className="text-[var(--text-muted)]">Загрузка...</p>
      </div>
    )
  }

  if (!settings.initialized || !settings.groq_api_key) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--bg)]">
        <div className="max-w-md text-center p-6">
          <h1 className="text-3xl font-bold mb-2">Loop</h1>
          <p className="text-[var(--text-muted)] mb-6">
            Введи Groq API ключ чтобы начать.
          </p>
          <SettingsView settings={settings} onSettingsChange={handleSettingsChange} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          <span className="text-[var(--accent)]">Loop</span>
          <span className="text-[var(--text-muted)] text-sm font-normal ml-2">
            {activeTab === 'chat' ? 'AI-психолог' :
             activeTab === 'graph' ? 'Граф памяти' :
             activeTab === 'exposure' ? 'Лестница экспозиции' :
             'Настройки'}
          </span>
        </h1>
        {settings.session_count > 0 && (
          <span className="text-xs text-[var(--text-muted)]">
            {settings.session_count} сессий
          </span>
        )}
      </header>

      <main className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <Chat settings={settings} />}
        {activeTab === 'graph' && <GraphView />}
        {activeTab === 'exposure' && <ExposureLadder settings={settings} />}
        {activeTab === 'settings' && (
          <SettingsView settings={settings} onSettingsChange={handleSettingsChange} />
        )}
      </main>

      <nav className="border-t border-[var(--border)] flex">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-xs transition-colors ${
              activeTab === tab.id
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <span className="block text-lg mb-0.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
