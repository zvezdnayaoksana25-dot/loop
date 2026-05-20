import type { GroqTool } from './groq';

export const AGENT_TOOLS: GroqTool[] = [
  {
    type: 'function',
    function: {
      name: 'create_memory',
      description: 'Create a new memory entry. Use this when the user shares new information, facts, preferences, or events.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['episodic', 'semantic', 'procedural'],
            description: 'Type of memory: episodic (timestamped events), semantic (facts/knowledge), procedural (patterns/workflows)',
          },
          domain: {
            type: 'string',
            enum: ['work', 'learning', 'health', 'personal', 'finance', 'goals', 'tech', 'general'],
            description: 'Life domain this memory belongs to',
          },
          title: {
            type: 'string',
            description: 'Short descriptive title for the memory',
          },
          content: {
            type: 'string',
            description: 'Full content of the memory',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Relevant tags for categorization',
          },
          importance: {
            type: 'number',
            minimum: 1,
            maximum: 10,
            description: 'Importance score from 1 (trivial) to 10 (critical)',
          },
        },
        required: ['type', 'domain', 'title', 'content', 'importance'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'update_memory',
      description: 'Update an existing memory when the user provides new or corrected information.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'ID of the memory to update',
          },
          title: {
            type: 'string',
            description: 'New title (optional)',
          },
          content: {
            type: 'string',
            description: 'New content (optional)',
          },
          importance: {
            type: 'number',
            minimum: 1,
            maximum: 10,
            description: 'New importance score (optional)',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'New tags (optional)',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_memory',
      description: 'Delete a memory that is no longer relevant or was incorrect.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'ID of the memory to delete',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_memories',
      description: 'Search through memories by content, title, or tags.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query to find relevant memories',
          },
          domain: {
            type: 'string',
            enum: ['work', 'learning', 'health', 'personal', 'finance', 'goals', 'tech', 'general'],
            description: 'Filter by domain (optional)',
          },
          type: {
            type: 'string',
            enum: ['episodic', 'semantic', 'procedural'],
            description: 'Filter by type (optional)',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results (default: 10)',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_memories',
      description: 'List memories with optional filters. Use to browse memories by domain or type.',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            enum: ['work', 'learning', 'health', 'personal', 'finance', 'goals', 'tech', 'general'],
            description: 'Filter by domain',
          },
          type: {
            type: 'string',
            enum: ['episodic', 'semantic', 'procedural'],
            description: 'Filter by type',
          },
          minImportance: {
            type: 'number',
            description: 'Minimum importance score',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results (default: 20)',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'merge_memories',
      description: 'Merge two or more similar memories into one consolidated memory. Use when memories overlap significantly.',
      parameters: {
        type: 'object',
        properties: {
          ids: {
            type: 'array',
            items: { type: 'number' },
            description: 'IDs of memories to merge (at least 2)',
          },
          mergedTitle: {
            type: 'string',
            description: 'Title for the merged memory',
          },
          mergedContent: {
            type: 'string',
            description: 'Content for the merged memory',
          },
        },
        required: ['ids', 'mergedTitle', 'mergedContent'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'read_memory',
      description: 'Read a specific memory by its ID.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'ID of the memory to read',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recall_relevant',
      description: 'Recall memories relevant to the current context or query. This is the primary retrieval tool.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The query or context to find relevant memories for',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of memories to recall (default: 5)',
          },
        },
        required: ['query'],
      },
    },
  },
];
