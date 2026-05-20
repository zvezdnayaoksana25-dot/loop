import type { ToolCall } from '../types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface GroqTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface GroqResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string | null;
      tool_calls?: {
        id: string;
        type: string;
        function: {
          name: string;
          arguments: string;
        };
      }[];
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function chatCompletion(
  apiKey: string,
  model: string,
  messages: { role: string; content: string; tool_calls?: ToolCall[]; tool_call_id?: string; name?: string }[],
  tools?: GroqTool[],
  temperature: number = 0.7
): Promise<GroqResponse> {
  const body = JSON.stringify({
    model,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
      ...(m.tool_calls ? { tool_calls: m.tool_calls } : {}),
      ...(m.tool_call_id ? { tool_call_id: m.tool_call_id } : {}),
      ...(m.name ? { name: m.name } : {}),
    })),
    tools,
    temperature,
  });

  console.log('Groq request:', model, 'messages:', messages.length, 'tools:', tools ? tools.length : 0);

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Groq API error:', response.status, error);
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  console.log('Groq response:', data.choices?.[0]?.message?.role, 'content length:', (data.choices?.[0]?.message?.content || '').length);
  return data;
}
