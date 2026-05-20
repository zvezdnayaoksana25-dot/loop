import { chatCompletion } from './groq';
import { createMemory, listMemories } from '../db/memories';
import { INSIGHT_PROMPT } from './prompts';

export interface Insight {
  title: string;
  content: string;
  domain: string;
  relatedDomains: string[];
  importance: number;
}

export async function generateInsights(
  apiKey: string,
  model: string,
  temperature: number = 0.5
): Promise<Insight[]> {
  const memories = await listMemories({ limit: 50 });

  if (memories.length < 5) {
    return [];
  }

  const memoryText = memories
    .map(
      (m) =>
        `[${m.type}] ${m.title} (${m.domain}, ${m.createdAt.toISOString()}): ${m.content}`
    )
    .join('\n');

  try {
    const response = await chatCompletion(
      apiKey,
      model,
      [
        { role: 'system', content: INSIGHT_PROMPT },
        { role: 'user', content: memoryText },
      ],
      undefined,
      temperature
    );

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const insights: Insight[] = JSON.parse(jsonMatch[0]);

    for (const insight of insights) {
      if (insight.title && insight.content) {
        await createMemory({
          type: 'semantic',
          domain: (insight.domain as any) || 'general',
          title: `Insight: ${insight.title}`,
          content: insight.content,
          tags: ['insight', ...(insight.relatedDomains || [])],
          source: 'agent',
          importance: insight.importance || 5,
          confidence: 0.7,
          relatedIds: [],
        });
      }
    }

    return insights;
  } catch {
    return [];
  }
}
