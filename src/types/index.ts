export type MemoryType = 'episodic' | 'semantic' | 'procedural';
export type MemoryDomain = 'work' | 'learning' | 'health' | 'personal' | 'finance' | 'goals' | 'tech' | 'general';
export type MemorySource = 'agent' | 'user';

export interface ContradictionEntry {
  oldContent: string;
  newContent: string;
  resolvedAt: Date;
}

export interface Memory {
  id?: number;
  type: MemoryType;
  domain: MemoryDomain;
  title: string;
  content: string;
  tags: string[];
  relatedIds: number[];
  source: MemorySource;
  sourceChatId?: number;
  importance: number;
  confidence: number;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
  accessCount: number;
  version: number;
  mergedFromIds: number[];
  contradictionHistory: ContradictionEntry[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
  timestamp: Date;
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface Chat {
  id?: number;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  memorySnapshot: string;
}

export interface Setting {
  key: string;
  value: unknown;
  updatedAt: Date;
}

export const DOMAINS: MemoryDomain[] = ['work', 'learning', 'health', 'personal', 'finance', 'goals', 'tech', 'general'];

export const DOMAIN_COLORS: Record<MemoryDomain, string> = {
  work: '#027AFF',
  learning: '#A882FF',
  health: '#44CF6E',
  personal: '#FA99CD',
  finance: '#E9973F',
  goals: '#53DFDD',
  tech: '#E0DE71',
  general: '#94A3B8',
};

export const DOMAIN_LABELS: Record<MemoryDomain, string> = {
  work: 'Work',
  learning: 'Learning',
  health: 'Health',
  personal: 'Personal',
  finance: 'Finance',
  goals: 'Goals',
  tech: 'Tech',
  general: 'General',
};

export const DEFAULT_SETTINGS = {
  groqApiKey: '',
  chatModel: 'llama-3.3-70b-versatile',
  extractionModel: 'llama-3.1-8b-instant',
  temperature: 0.7,
  autoMemoryExtraction: true,
  autoConsolidation: true,
  insightFrequency: 10,
  lastBackupDate: null as string | null,
};
