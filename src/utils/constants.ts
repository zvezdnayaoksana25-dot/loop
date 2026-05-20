import type { MemoryDomain } from '../types';

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

export const DOMAIN_ICONS: Record<MemoryDomain, string> = {
  work: '💼',
  learning: '📚',
  health: '💪',
  personal: '👤',
  finance: '💰',
  goals: '🎯',
  tech: '⚙️',
  general: '📌',
};

export const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Best quality, 128K context' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', description: 'Fast, 128K context' },
  { id: 'qwen/qwen3-32b', name: 'Qwen3 32B', description: 'Good balance, 131K context' },
  { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B', description: 'Open model, 128K context' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout', description: 'Latest, 512K context' },
];
