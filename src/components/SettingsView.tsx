import { useState, useEffect } from 'react'
import type { Settings, Profile, Fact, Insight, ExposureStep } from '../types'
import * as db from '../db'
import { initGroq } from '../groq/client'

interface SettingsProps {
  settings: Settings
  onSettingsChange: (s: Settings) => void
}

export default function SettingsView({ settings, onSettingsChange }: SettingsProps) {
  const [apiKey, setApiKey] = useState(settings.groq_api_key)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [facts, setFacts] = useState<Fact[]>([])
  const [insights, setInsights] = useState<Insight[]>([])
  const [exposure, setExposure] = useState<ExposureStep[]>([])
  const [activeTab, setActiveTab] = useState<'settings' | 'profile' | 'facts' | 'insights' | 'exposure'>('settings')
  const [exportData, setExportData] = useState('')
  const [showExport, setShowExport] = useState(false)

  useEffect(() => {
    loadMemoryData()
  }, [])

  async function loadMemoryData() {
    const [p, f, i, e] = await Promise.all([
      db.getProfile(),
      db.getAllFacts(),
      db.getInsights(),
      db.getExposureSteps(),
    ])
    setProfile(p)
    setFacts(f)
    setInsights(i)
    setExposure(e)
  }

  async function handleSave() {
    const newSettings: Settings = {
      ...settings,
      groq_api_key: apiKey,
      initialized: true,
    }
    await db.saveSettings(newSettings)
    initGroq(apiKey)
    onSettingsChange(newSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleClear() {
    if (confirm('Удалить ВСЕ данные? Это действие нельзя отменить.')) {
      await db.clearAllData()
      setProfile(null)
      setFacts([])
      setInsights([])
      setExposure([])
    }
  }

  async function handleExport() {
    const data = await db.exportData()
    setExportData(data)
    setShowExport(true)
  }

  async function handleDeleteFact(id: string) {
    await db.deleteFact(id)
    setFacts(f => f.filter(f => f.id !== id))
  }

  const tabs = [
    { id: 'settings' as const, label: 'Настройки' },
    { id: 'profile' as const, label: `Профиль (${profile ? 'есть' : 'нет'})` },
    { id: 'facts' as const, label: `Факты (${facts.length})` },
    { id: 'insights' as const, label: `Инсайты (${insights.length})` },
    { id: 'exposure' as const, label: `Exposure (${exposure.length})` },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-[var(--border)]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'settings' && (
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Groq API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Ключ хранится локально. Получить: console.groq.com
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Основная модель</label>
              <select
                value={settings.model_main}
                onChange={e => onSettingsChange({ ...settings, model_main: e.target.value })}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="llama-3.3-70b-versatile">llama-3.3-70b (рекомендуется)</option>
                <option value="llama-3.1-8b-instant">llama-3.1-8b (быстрее)</option>
                <option value="mixtral-8x7b-32768">mixtral-8x7b</option>
                <option value="gemma2-9b-it">gemma2-9b</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Дешёвая модель (extraction)</label>
              <select
                value={settings.model_cheap}
                onChange={e => onSettingsChange({ ...settings, model_cheap: e.target.value })}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="llama-3.1-8b-instant">llama-3.1-8b (рекомендуется)</option>
                <option value="gemma2-9b-it">gemma2-9b</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-[var(--accent)] hover:bg-[var(--accent-dim)] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                {saved ? 'Сохранено ✓' : 'Сохранить'}
              </button>
              <button
                onClick={handleExport}
                className="bg-[var(--bg-tertiary)] hover:bg-[var(--border)] text-[var(--text)] px-6 py-3 rounded-lg text-sm transition-colors"
              >
                Экспорт данных
              </button>
              <button
                onClick={handleClear}
                className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-6 py-3 rounded-lg text-sm transition-colors"
              >
                Удалить всё
              </button>
            </div>

            <div className="text-xs text-[var(--text-muted)] space-y-1">
              <p>Сессий: {settings.session_count}</p>
              <p>Консолидация каждые 5 сессий</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl space-y-6">
            {!profile ? (
              <p className="text-[var(--text-muted)]">Профиль ещё не создан. Он появится после первой консолидации (через 5 сессий).</p>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">УБЕЖДЕНИЯ</h3>
                  <div className="space-y-1">
                    {profile.core_beliefs.map((b, i) => (
                      <div key={i} className="bg-[var(--bg-secondary)] rounded px-3 py-2 text-sm">{b}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">ТРИГГЕРЫ</h3>
                  <div className="space-y-1">
                    {profile.triggers.map((t, i) => (
                      <div key={i} className="bg-[var(--bg-secondary)] rounded px-3 py-2 text-sm">{t}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">ПАТТЕРНЫ</h3>
                  <div className="space-y-1">
                    {Object.entries(profile.patterns).map(([k, v]) => (
                      <div key={k} className="bg-[var(--bg-secondary)] rounded px-3 py-2 text-sm">
                        <span className="text-[var(--accent)]">{k}:</span> {v}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">ПРОГРЕСС EXPOSURE</h3>
                  <div className="bg-[var(--bg-secondary)] rounded px-3 py-2 text-sm space-y-1">
                    <p>Текущий шаг: {profile.exposure_progress.current_step}</p>
                    <p>Выполнено: {profile.exposure_progress.steps_completed.join(', ') || 'ничего'}</p>
                    <p>Тренд тревоги: {profile.exposure_progress.anxiety_trend}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">СТАТИСТИКА ИЗБЕГАНИЯ</h3>
                  <div className="bg-[var(--bg-secondary)] rounded px-3 py-2 text-sm space-y-1">
                    <p>Всего избеганий: {profile.avoidance_stats.total_avoidances}</p>
                    <p>Среднее облегчение: ~{profile.avoidance_stats.avg_relief_duration_minutes} мин</p>
                    <p>Рост тревоги после: +{profile.avoidance_stats.avg_post_avoidance_anxiety_increase}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">АКТИВНЫЕ ТЕМЫ</h3>
                  <div className="space-y-1">
                    {profile.active_threads.map((t, i) => (
                      <div key={i} className="bg-[var(--bg-secondary)] rounded px-3 py-2 text-sm">{t}</div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Последняя консолидация: {new Date(profile.last_consolidated).toLocaleDateString('ru-RU')}
                </p>
              </>
            )}
          </div>
        )}

        {activeTab === 'facts' && (
          <div className="max-w-2xl space-y-3">
            {facts.length === 0 ? (
              <p className="text-[var(--text-muted)]">Фактов пока нет. Они извлекаются после каждой сессии.</p>
            ) : (
              facts.map(fact => (
                <div key={fact.id} className="bg-[var(--bg-secondary)] rounded-lg p-4 flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        fact.category === 'belief' ? 'bg-purple-900/30 text-purple-400' :
                        fact.category === 'emotion' ? 'bg-red-900/30 text-red-400' :
                        fact.category === 'event' ? 'bg-blue-900/30 text-blue-400' :
                        fact.category === 'pattern' ? 'bg-yellow-900/30 text-yellow-400' :
                        fact.category === 'trigger' ? 'bg-orange-900/30 text-orange-400' :
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {fact.category}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">{fact.confidence}</span>
                    </div>
                    <p className="text-sm">{fact.text}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {new Date(fact.timestamp).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteFact(fact.id)}
                    className="text-[var(--text-muted)] hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="max-w-2xl space-y-3">
            {insights.length === 0 ? (
              <p className="text-[var(--text-muted)]">Инсайтов пока нет. Они появляются после консолидации.</p>
            ) : (
              insights.map(insight => (
                <div key={insight.id} className="bg-[var(--bg-secondary)] rounded-lg p-4">
                  <p className="text-sm">{insight.text}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    {new Date(insight.timestamp).toLocaleDateString('ru-RU')} · {insight.source}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'exposure' && (
          <div className="max-w-2xl space-y-3">
            {exposure.length === 0 ? (
              <p className="text-[var(--text-muted)]">Шагов exposure пока нет. Добавь их в разделе Exposure.</p>
            ) : (
              exposure.map(step => (
                <div key={step.id} className={`rounded-lg p-4 ${step.completed ? 'bg-green-900/10 border border-green-900/30' : 'bg-[var(--bg-secondary)]'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step.completed ? 'bg-green-500 text-black' : 'bg-[var(--border)] text-[var(--text-muted)]'
                    }`}>
                      {step.id}
                    </span>
                    <span className="text-sm flex-1">{step.description}</span>
                    {step.completed && <span className="text-green-400 text-xs">✓</span>}
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-[var(--text-muted)]">
                    <span>Тревога до: {step.anxiety_before}/100</span>
                    <span>Тревога после: {step.anxiety_after}/100</span>
                    <span>Попыток: {step.attempts}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showExport && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Экспорт данных</h3>
              <button onClick={() => setShowExport(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">✕</button>
            </div>
            <textarea
              value={exportData}
              readOnly
              className="flex-1 bg-[var(--bg)] rounded-lg p-4 text-xs font-mono resize-none focus:outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(exportData)
                setShowExport(false)
              }}
              className="mt-4 bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-sm"
            >
              Копировать
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
