import { v4 as uuidv4 } from 'uuid'
import type { Fact, GraphNode, Settings, Session, Message } from '../types'
import * as db from '../db'
import { extractFacts, retrieveRelevantFacts, consolidateProfile, generateSessionSummary } from '../groq/client'

const CONSOLIDATION_INTERVAL = 5

export async function buildChatContext(
  userMessage: string,
  settings: Settings,
): Promise<Message[]> {
  const profile = await db.getProfile()
  const recentSessions = await db.getRecentSessions(2)
  const allFacts = await db.getAllFacts()

  const identity = `Ты — прямой, честный AI-психолог. Специализация: CBT, цикл избегания тревоги, экспозиционная терапия.

СТИЛЬ:
- Прямой, ясный, без сентиментальности
- Называй вещи своими именами. Не смягчай harsh truths
- Замечай противоречия, отговорки, самообман — говори об этом прямо
- Используй конкретные данные из истории пользователя
- Не говори "я понимаю как тебе тяжело" — покажи понимание через факты
- Валидируй ПРОГРЕСС, не страдание
- Если пользователь ищет оправдания — скажи об этом
- Никогда не shame, но никогда и не coddle
- Общайся на русском языке

ПРИНЦИПЫ:
1. Избегание — это регуляция эмоций, а не лень. Но это не оправдание.
2. Указывай на противоречия и отговорки напрямую.
3. Не смягчай неприятные правды.
4. Замечай слепые зоны — даже если это дискомфортно.
5. Данные важнее чувств.
6. Самокомpassion — инструмент для изменения поведения, не повод жалеть себя.`

  let profileContext = ''
  if (profile) {
    profileContext = `\nПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ:
Убеждения: ${profile.core_beliefs.join(', ') || 'не определены'}
Триггеры: ${profile.triggers.join(', ') || 'не определены'}
Паттерны: ${Object.entries(profile.patterns).map(([k, v]) => `${k}: ${v}`).join('; ') || 'не определены'}
Прогресс exposure: шаг ${profile.exposure_progress.current_step}, выполнено: ${profile.exposure_progress.steps_completed.join(', ') || 'ничего'}
Активные темы: ${profile.active_threads.join(', ') || 'нет'}
Статистика избегания: ${profile.avoidance_stats.total_avoidances} избеганий, облегчение ~${profile.avoidance_stats.avg_relief_duration_minutes}мин`
  }

  let sessionsContext = ''
  if (recentSessions.length > 0) {
    sessionsContext = '\n\nНЕДАВНИЕ СЕССИИ:\n' + recentSessions.map(s =>
      `[${new Date(s.timestamp).toLocaleDateString('ru-RU')}] ${s.summary}`
    ).join('\n')
  }

  let factsContext = ''
  try {
    const relevantIndices = await retrieveRelevantFacts(userMessage, allFacts, settings.model_cheap)
    if (relevantIndices.length > 0) {
      const relevantFacts = relevantIndices.map(i => allFacts[i]).filter(Boolean)
      factsContext = '\n\nРЕЛЕВАНТНЫЕ ФАКТЫ:\n' + relevantFacts.map(f =>
        `[${f.category}] ${f.text}`
      ).join('\n')
    }
  } catch {
    // Retrieval failed — continue without L3
  }

  const systemContent = identity + profileContext + sessionsContext + factsContext

  const messages: Message[] = [
    { role: 'system', content: systemContent, timestamp: new Date().toISOString() },
  ]

  for (const session of recentSessions) {
    const recentMessages = session.messages.slice(-5)
    messages.push(...recentMessages)
  }

  return messages
}

export async function processPostResponse(
  sessionId: string,
  messages: Message[],
  settings: Settings,
): Promise<void> {
  try {
    const allFacts = await db.getAllFacts()
    const sessionText = messages
      .filter(m => m.role !== 'system')
      .map(m => `${m.role}: ${m.content}`)
      .join('\n')

    const extraction = await extractFacts(sessionText, allFacts, settings.model_cheap)

    for (const nf of extraction.new_facts) {
      const fact: Fact = {
        id: uuidv4(),
        ...nf,
        timestamp: new Date().toISOString(),
        source_session: sessionId,
      }
      await db.saveFact(fact)
    }

    for (const cf of extraction.contradicted_facts) {
      await db.deleteFact(cf.id)
    }

    await updateGraph(extraction.new_facts)

    const sessionCount = await db.getSessionCount()
    if (sessionCount % CONSOLIDATION_INTERVAL === 0 && sessionCount > 0) {
      await runConsolidation(settings)
    }
  } catch (err) {
    console.error('Post-response pipeline error:', err)
  }
}

export async function updateGraph(
  newFacts: { text: string; category: string }[],
): Promise<void> {
  const graph = await db.getGraph()

  for (const fact of newFacts) {
    const nodeId = `fact_${fact.text.slice(0, 30).replace(/\s+/g, '_')}`

    if (!graph.nodes.find(n => n.id === nodeId)) {
      graph.nodes.push({
        id: nodeId,
        label: fact.text.slice(0, 50),
        type: fact.category as GraphNode['type'],
        val: 1,
      })
    }

    const sameCategory = graph.nodes.filter(n => n.type === fact.category && n.id !== nodeId)
    for (const related of sameCategory.slice(0, 2)) {
      const edgeExists = graph.edges.some(
        e => (e.source === nodeId && e.target === related.id) ||
             (e.source === related.id && e.target === nodeId)
      )
      if (!edgeExists) {
        graph.edges.push({
          source: nodeId,
          target: related.id,
          relation: 'associated_with',
        })
      }
    }

    if (fact.category === 'trigger') {
      const beliefs = graph.nodes.filter(n => n.type === 'belief')
      for (const belief of beliefs.slice(0, 1)) {
        const edgeExists = graph.edges.some(
          e => e.source === nodeId && e.target === belief.id
        )
        if (!edgeExists) {
          graph.edges.push({
            source: nodeId,
            target: belief.id,
            relation: 'triggered_by',
          })
        }
      }
    }
  }

  await db.saveGraph(graph)
}

export async function runConsolidation(settings: Settings): Promise<void> {
  try {
    const profile = await db.getProfile()
    const facts = await db.getAllFacts()
    const recentSessions = await db.getRecentSessions(5)

    const sessionTexts = recentSessions.map(s =>
      s.messages.filter(m => m.role !== 'system').map(m => `${m.role}: ${m.content}`).join('\n')
    )

    const result = await consolidateProfile(profile, facts, sessionTexts, settings.model_main)

    await db.saveProfile(result.profile)

    for (const insight of result.new_insights) {
      await db.saveInsight({
        id: uuidv4(),
        text: insight,
        timestamp: new Date().toISOString(),
        source: 'consolidation',
      })
    }
  } catch (err) {
    console.error('Consolidation error:', err)
  }
}

export async function saveAndProcessSession(
  messages: Message[],
  settings: Settings,
): Promise<string> {
  const sessionId = uuidv4()
  const summary = await generateSessionSummary(messages, settings.model_cheap)

  const session: Session = {
    id: sessionId,
    timestamp: new Date().toISOString(),
    messages,
    summary,
    token_count: messages.reduce((sum, m) => sum + m.content.length / 4, 0),
    fact_ids_extracted: [],
  }

  await db.saveSession(session)

  settings.session_count = await db.getSessionCount()
  await db.saveSettings(settings)

  await processPostResponse(sessionId, messages, settings)

  return sessionId
}
