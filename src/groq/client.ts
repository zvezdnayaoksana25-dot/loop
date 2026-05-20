import Groq from 'groq-sdk'
import type { Message, FactExtractionResult, ConsolidationResult, Profile, Fact } from '../types'

let groq: Groq | null = null

export function initGroq(apiKey: string): void {
  groq = new Groq({
    apiKey,
    dangerouslyAllowBrowser: true,
  })
}

export function getGroq(): Groq {
  if (!groq) throw new Error('Groq not initialized. Set your API key in Settings.')
  return groq
}

export async function chatCompletion(
  messages: Message[],
  model: string,
  temperature: number = 0.7,
): Promise<string> {
  const client = getGroq()
  const response = await client.chat.completions.create({
    model,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    temperature,
    max_tokens: 2000,
  })
  return response.choices[0]?.message?.content || ''
}

export async function chatCompletionJSON<T>(
  messages: Message[],
  model: string,
  temperature: number = 0,
): Promise<T> {
  const client = getGroq()
  const response = await client.chat.completions.create({
    model,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    temperature,
    max_tokens: 2000,
    response_format: { type: 'json_object' },
  })
  const raw = response.choices[0]?.message?.content || '{}'
  return JSON.parse(raw) as T
}

export async function extractFacts(
  sessionText: string,
  existingFacts: Fact[],
  model: string,
): Promise<FactExtractionResult> {
  const factsContext = existingFacts
    .slice(0, 20)
    .map(f => `[${f.id}] ${f.text} (${f.category}, ${f.confidence})`)
    .join('\n')

  const prompt = `Ты анализируешь сессию с пользователем и извлекаешь факты о нём.

Правила:
- Извлекай только факты о ПОЛЬЗОВАТЕЛЕ, не об AI
- Один факт на элемент
- category: belief, emotion, event, pattern, trigger, progress
- confidence: high, medium, low
- Если факт противоречит существующему — укажи это в contradicted_facts
- Если факт обновляет существующий — укажи это в updated_facts
- Возвращай ТОЛЬКО валидный JSON, без markdown, без объяснений

Существующие факты:
${factsContext || 'Нет существующих фактов.'}

Сессия:
${sessionText}

Формат вывода:
{
  "new_facts": [{"text": "...", "category": "...", "confidence": "..."}],
  "updated_facts": [{"id": "...", "text": "...", "reason": "..."}],
  "contradicted_facts": [{"id": "...", "reason": "..."}]
}`

  return chatCompletionJSON<FactExtractionResult>(
    [{ role: 'user', content: prompt, timestamp: new Date().toISOString() }],
    model,
    0,
  )
}

export async function retrieveRelevantFacts(
  userMessage: string,
  allFacts: Fact[],
  model: string,
): Promise<number[]> {
  if (allFacts.length === 0) return []

  const factsList = allFacts
    .map((f, i) => `[${i}] ${f.text} (${f.category})`)
    .join('\n')

  const prompt = `Дан запрос пользователя и список фактов о нём. Верни индексы 5 наиболее релевантных фактов.

Запрос: "${userMessage}"

Факты:
${factsList}

Верни ТОЛЬКО JSON массив индексов, например: [0, 3, 7, 12, 15]`

  try {
    const result = await chatCompletionJSON<number[]>(
      [{ role: 'user', content: prompt, timestamp: new Date().toISOString() }],
      model,
      0,
    )
    return Array.isArray(result) ? result.filter(i => i >= 0 && i < allFacts.length).slice(0, 5) : []
  } catch {
    return []
  }
}

export async function consolidateProfile(
  currentProfile: Profile | null,
  facts: Fact[],
  recentSessions: string[],
  model: string,
): Promise<ConsolidationResult> {
  const factsText = facts
    .map(f => `[${f.category}] ${f.text} (${f.confidence})`)
    .join('\n')

  const sessionsText = recentSessions.join('\n---\n')

  const prompt = `Ты — AI-психолог. Проанализируй все факты и недавние сессии пользователя и обнови его профиль.

Текущий профиль:
${currentProfile ? JSON.stringify(currentProfile, null, 2) : 'Нет текущего профиля.'}

Все факты:
${factsText}

Недавние сессии:
${sessionsText}

Обнови профиль:
- Добавь новые убеждения, триггеры, паттерны
- Обнови прогресс по exposure
- Выяви новые инсайты
- Будь конкретным и основанным на данных

Верни ТОЛЬКО валидный JSON:
{
  "profile": {
    "core_beliefs": ["...", "..."],
    "triggers": ["...", "..."],
    "patterns": {"pattern_name": "description"},
    "exposure_progress": {"steps_completed": [], "current_step": 0, "anxiety_trend": "..."},
    "active_threads": ["...", "..."],
    "avoidance_stats": {"total_avoidances": 0, "avg_relief_duration_minutes": 0, "avg_post_avoidance_anxiety_increase": 0},
    "last_consolidated": "2026-05-20T..."
  },
  "new_insights": ["...", "..."]
}`

  return chatCompletionJSON<ConsolidationResult>(
    [{ role: 'user', content: prompt, timestamp: new Date().toISOString() }],
    model,
    0.3,
  )
}

export async function generateSessionSummary(
  messages: Message[],
  model: string,
): Promise<string> {
  const conversationText = messages
    .map(m => `${m.role}: ${m.content}`)
    .join('\n')

  const prompt = `Кратко суммаризируй эту сессию (2-3 предложения). Что обсуждалось? Какие ключевые моменты?

${conversationText}

Верни ТОЛЬКО суммаризацию, без JSON, без markdown.`

  return chatCompletion(
    [{ role: 'user', content: prompt, timestamp: new Date().toISOString() }],
    model,
    0.3,
  )
}
