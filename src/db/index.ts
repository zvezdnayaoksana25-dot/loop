import { openDB, type IDBPDatabase } from 'idb'
import type {
  Fact,
  Session,
  Profile,
  GraphData,
  Insight,
  Settings,
  ExposureStep,
} from '../types'

const DB_NAME = 'loop-memory'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase> | null = null

export async function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile')
        }
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('facts')) {
          db.createObjectStore('facts', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('graph')) {
          db.createObjectStore('graph')
        }
        if (!db.objectStoreNames.contains('insights')) {
          db.createObjectStore('insights', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings')
        }
        if (!db.objectStoreNames.contains('exposure')) {
          db.createObjectStore('exposure', { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function getProfile(): Promise<Profile | null> {
  const db = await getDB()
  return db.get('profile', 'current') || null
}

export async function saveProfile(profile: Profile): Promise<void> {
  const db = await getDB()
  await db.put('profile', profile, 'current')
}

export async function saveSession(session: Session): Promise<void> {
  const db = await getDB()
  await db.put('sessions', session)
}

export async function getSessions(): Promise<Session[]> {
  const db = await getDB()
  const all = await db.getAll('sessions')
  return all.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export async function getRecentSessions(count: number): Promise<Session[]> {
  const sessions = await getSessions()
  return sessions.slice(0, count)
}

export async function getSessionCount(): Promise<number> {
  const db = await getDB()
  const keys = await db.getAllKeys('sessions')
  return keys.length
}

export async function saveFact(fact: Fact): Promise<void> {
  const db = await getDB()
  await db.put('facts', fact)
}

export async function deleteFact(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('facts', id)
}

export async function getAllFacts(): Promise<Fact[]> {
  const db = await getDB()
  const all = await db.getAll('facts')
  return all.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export async function getFact(id: string): Promise<Fact | undefined> {
  const db = await getDB()
  return db.get('facts', id)
}

export async function getGraph(): Promise<GraphData> {
  const db = await getDB()
  return (await db.get('graph', 'data')) || { nodes: [], edges: [] }
}

export async function saveGraph(graph: GraphData): Promise<void> {
  const db = await getDB()
  await db.put('graph', graph, 'data')
}

export async function saveInsight(insight: Insight): Promise<void> {
  const db = await getDB()
  await db.put('insights', insight)
}

export async function getInsights(): Promise<Insight[]> {
  const db = await getDB()
  const all = await db.getAll('insights')
  return all.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export async function getSettings(): Promise<Settings> {
  const db = await getDB()
  return (await db.get('settings', 'current')) || {
    groq_api_key: '',
    model_main: 'llama-3.3-70b-versatile',
    model_cheap: 'llama-3.1-8b-instant',
    session_count: 0,
    initialized: false,
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  const db = await getDB()
  await db.put('settings', settings, 'current')
}

export async function saveExposureStep(step: ExposureStep): Promise<void> {
  const db = await getDB()
  await db.put('exposure', step)
}

export async function getExposureSteps(): Promise<ExposureStep[]> {
  const db = await getDB()
  const all = await db.getAll('exposure')
  return all.sort((a, b) => a.id - b.id)
}

export async function clearAllData(): Promise<void> {
  const db = await getDB()
  await db.clear('profile')
  await db.clear('sessions')
  await db.clear('facts')
  await db.clear('graph')
  await db.clear('insights')
  await db.clear('exposure')
  const settings = await getSettings()
  await db.clear('settings')
  await saveSettings({ ...settings, session_count: 0, initialized: false })
}

export async function exportData(): Promise<string> {
  const db = await getDB()
  const data = {
    profile: await db.get('profile', 'current'),
    sessions: await db.getAll('sessions'),
    facts: await db.getAll('facts'),
    graph: await db.get('graph', 'data'),
    insights: await db.getAll('insights'),
    exposure: await db.getAll('exposure'),
    exported_at: new Date().toISOString(),
  }
  return JSON.stringify(data, null, 2)
}

export async function importData(json: string): Promise<void> {
  const db = await getDB()
  const data = JSON.parse(json)
  if (data.profile) await db.put('profile', data.profile, 'current')
  if (data.sessions) {
    for (const s of data.sessions) await db.put('sessions', s)
  }
  if (data.facts) {
    for (const f of data.facts) await db.put('facts', f)
  }
  if (data.graph) await db.put('graph', data.graph, 'data')
  if (data.insights) {
    for (const i of data.insights) await db.put('insights', i)
  }
  if (data.exposure) {
    for (const e of data.exposure) await db.put('exposure', e)
  }
}
