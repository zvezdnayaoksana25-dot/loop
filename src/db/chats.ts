import { db } from './database';
import type { Chat, ChatMessage } from '../types';

export async function createChat(title: string = 'New Chat'): Promise<number> {
  const now = new Date();
  return db.chats.add({
    title,
    messages: [],
    createdAt: now,
    updatedAt: now,
    memorySnapshot: '',
  });
}

export async function getChat(id: number): Promise<Chat | undefined> {
  return db.chats.get(id);
}

export async function updateChat(id: number, updates: Partial<Chat>): Promise<void> {
  await db.chats.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
}

export async function addMessage(chatId: number, message: ChatMessage): Promise<void> {
  const chat = await getChat(chatId);
  if (!chat) return;

  const messages = [...chat.messages, message];
  let title = chat.title;

  if (chat.messages.length === 0 && message.role === 'user') {
    title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
  }

  await updateChat(chatId, { messages, title });
}

export async function deleteChat(id: number): Promise<void> {
  await db.chats.delete(id);
}

export async function listChats(): Promise<Chat[]> {
  return db.chats.orderBy('updatedAt').reverse().toArray();
}

export async function clearAllChats(): Promise<void> {
  await db.chats.clear();
}
