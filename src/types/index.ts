export interface Fact {
  id: string
  text: string
  category: 'belief' | 'emotion' | 'event' | 'pattern' | 'trigger' | 'progress'
  confidence: 'high' | 'medium' | 'low'
  timestamp: string
  source_session: string
}

export interface GraphNode {
  id: string
  label: string
  type: 'belief' | 'emotion' | 'event' | 'pattern' | 'trigger' | 'progress'
  val?: number
}

export interface GraphEdge {
  source: string
  target: string
  relation: 'triggered_by' | 'leads_to' | 'associated_with' | 'contradicts' | 'reinforces'
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface Profile {
  core_beliefs: string[]
  triggers: string[]
  patterns: Record<string, string>
  exposure_progress: {
    steps_completed: number[]
    current_step: number
    anxiety_trend: string
  }
  active_threads: string[]
  avoidance_stats: {
    total_avoidances: number
    avg_relief_duration_minutes: number
    avg_post_avoidance_anxiety_increase: number
  }
  last_consolidated: string
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

export interface Session {
  id: string
  timestamp: string
  messages: Message[]
  summary: string
  token_count: number
  fact_ids_extracted: string[]
}

export interface Insight {
  id: string
  text: string
  timestamp: string
  source: 'consolidation' | 'extraction' | 'user'
}

export interface ExposureStep {
  id: number
  description: string
  completed: boolean
  completed_at?: string
  anxiety_before: number
  anxiety_after: number
  attempts: number
}

export interface Settings {
  groq_api_key: string
  model_main: string
  model_cheap: string
  session_count: number
  initialized: boolean
}

export interface FactExtractionResult {
  new_facts: Omit<Fact, 'id' | 'source_session'>[]
  updated_facts: { id: string; text: string; reason: string }[]
  contradicted_facts: { id: string; reason: string }[]
}

export interface ConsolidationResult {
  profile: Profile
  new_insights: string[]
}
