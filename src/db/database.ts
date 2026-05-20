import Dexie, { type Table } from 'dexie';
import type { Memory, Chat, Setting } from '../types';

export class SecondBrainDB extends Dexie {
  memories!: Table<Memory>;
  chats!: Table<Chat>;
  settings!: Table<Setting>;

  constructor() {
    super('second-brain-db');
    this.version(1).stores({
      memories: '++id, type, domain, importance, createdAt, updatedAt, lastAccessedAt, accessCount',
      chats: '++id, createdAt, updatedAt',
      settings: 'key, updatedAt',
    });
  }
}

export const db = new SecondBrainDB();
