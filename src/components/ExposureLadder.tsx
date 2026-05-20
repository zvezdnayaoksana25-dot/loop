import { useState, useEffect } from 'react'
import type { ExposureStep } from '../types'
import * as db from '../db'

interface ExposureLadderProps {
  settings?: { session_count: number }
}

const DEFAULT_STEPS: Omit<ExposureStep, 'id'>[] = [
  { description: 'Включить камеру на 5 минут без зрителей', completed: false, anxiety_before: 0, anxiety_after: 0, attempts: 0 },
  { description: 'Выйти на стрим на 15 минут', completed: false, anxiety_before: 0, anxiety_after: 0, attempts: 0 },
  { description: 'Выйти на стрим на 30 минут', completed: false, anxiety_before: 0, anxiety_after: 0, attempts: 0 },
  { description: 'Выйти на стрим на 1 час', completed: false, anxiety_before: 0, anxiety_after: 0, attempts: 0 },
  { description: 'Полная смена (2+ часа)', completed: false, anxiety_before: 0, anxiety_after: 0, attempts: 0 },
]

export default function ExposureLadder({ settings: _settings }: ExposureLadderProps) {
  const [steps, setSteps] = useState<ExposureStep[]>([])
  const [editingStep, setEditingStep] = useState<number | null>(null)
  const [anxietyBefore, setAnxietyBefore] = useState(0)
  const [anxietyAfter, setAnxietyAfter] = useState(0)
  const [showAddStep, setShowAddStep] = useState(false)
  const [newStepDesc, setNewStepDesc] = useState('')

  useEffect(() => {
    loadSteps()
  }, [])

  async function loadSteps() {
    const existing = await db.getExposureSteps()
    if (existing.length === 0) {
      const defaults: ExposureStep[] = DEFAULT_STEPS.map((s, i) => ({
        ...s,
        id: i + 1,
      }))
      for (const step of defaults) {
        await db.saveExposureStep(step)
      }
      setSteps(defaults)
    } else {
      setSteps(existing)
    }
  }

  async function handleAttempt(stepId: number) {
    setEditingStep(stepId)
    setAnxietyBefore(0)
    setAnxietyAfter(0)
  }

  async function handleSaveAttempt() {
    if (editingStep === null) return

    const updated = steps.map(s => {
      if (s.id === editingStep) {
        return {
          ...s,
          anxiety_before: anxietyBefore,
          anxiety_after: anxietyAfter,
          attempts: s.attempts + 1,
          completed: anxietyAfter < anxietyBefore,
          completed_at: anxietyAfter < anxietyBefore ? new Date().toISOString() : s.completed_at,
        }
      }
      return s
    })

    for (const step of updated) {
      await db.saveExposureStep(step)
    }
    setSteps(updated)
    setEditingStep(null)
  }

  async function handleAddStep() {
    if (!newStepDesc.trim()) return
    const maxId = Math.max(...steps.map(s => s.id), 0)
    const newStep: ExposureStep = {
      id: maxId + 1,
      description: newStepDesc.trim(),
      completed: false,
      anxiety_before: 0,
      anxiety_after: 0,
      attempts: 0,
    }
    await db.saveExposureStep(newStep)
    setSteps([...steps, newStep])
    setNewStepDesc('')
    setShowAddStep(false)
  }

  const completedCount = steps.filter(s => s.completed).length

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">Лестница экспозиции</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Выполнено: {completedCount}/{steps.length}
          </p>
          <div className="mt-2 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--success)] transition-all"
              style={{ width: `${(completedCount / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`rounded-lg p-4 border transition-colors ${
                step.completed
                  ? 'bg-green-900/10 border-green-900/30'
                  : 'bg-[var(--bg-secondary)] border-[var(--border)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.completed
                      ? 'bg-[var(--success)] text-black'
                      : 'bg-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {step.completed ? '✓' : index + 1}
                </span>
                <span className="flex-1 text-sm">{step.description}</span>
                {!step.completed && (
                  <button
                    onClick={() => handleAttempt(step.id)}
                    className="bg-[var(--accent)] hover:bg-[var(--accent-dim)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    Попытка
                  </button>
                )}
              </div>

              {step.attempts > 0 && (
                <div className="mt-2 ml-11 text-xs text-[var(--text-muted)] space-y-1">
                  <span>Попыток: {step.attempts}</span>
                  {step.completed && step.completed_at && (
                    <span className="ml-3 text-green-400">
                      Выполнено: {new Date(step.completed_at).toLocaleDateString('ru-RU')}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {showAddStep ? (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newStepDesc}
              onChange={e => setNewStepDesc(e.target.value)}
              placeholder="Описание нового шага..."
              className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
              onKeyDown={e => e.key === 'Enter' && handleAddStep()}
            />
            <button
              onClick={handleAddStep}
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-sm"
            >
              Добавить
            </button>
            <button
              onClick={() => setShowAddStep(false)}
              className="bg-[var(--bg-tertiary)] text-[var(--text)] px-4 py-2 rounded-lg text-sm"
            >
              Отмена
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddStep(true)}
            className="mt-4 w-full border border-dashed border-[var(--border)] rounded-lg py-3 text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-colors"
          >
            + Добавить шаг
          </button>
        )}
      </div>

      {editingStep !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-medium mb-4">
              Попытка: {steps.find(s => s.id === editingStep)?.description}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Тревога ДО (0-100)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={anxietyBefore}
                  onChange={e => setAnxietyBefore(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{anxietyBefore}/100</span>
              </div>

              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Тревога ПОСЛЕ (0-100)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={anxietyAfter}
                  onChange={e => setAnxietyAfter(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{anxietyAfter}/100</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveAttempt}
                  className="flex-1 bg-[var(--accent)] text-white py-2 rounded-lg text-sm font-medium"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingStep(null)}
                  className="flex-1 bg-[var(--bg-tertiary)] text-[var(--text)] py-2 rounded-lg text-sm"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
