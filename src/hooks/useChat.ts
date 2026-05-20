import { useState, useCallback } from 'react';
import type { Chat, ChatMessage } from '../types';
import { createChat, addMessage, listChats, getChat, deleteChat as deleteChatDb } from '../db/chats';

export function useChat() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading] = useState(false);

  const loadChats = useCallback(async () => {
    const allChats = await listChats();
    setChats(allChats);
  }, []);

  const loadChat = useCallback(async (id: number) => {
    const chat = await getChat(id);
    if (chat) {
      setCurrentChat(chat);
    }
  }, []);

  const createNewChat = useCallback(async () => {
    const id = await createChat();
    await loadChats();
    const chat = await getChat(id);
    if (chat) setCurrentChat(chat);
    return id;
  }, [loadChats]);

  const sendMessage = useCallback(async (chatId: number, message: ChatMessage) => {
    await addMessage(chatId, message);
    await loadChat(chatId);
  }, [loadChat]);

  const deleteChat = useCallback(async (id: number) => {
    await deleteChatDb(id);
    if (currentChat?.id === id) {
      setCurrentChat(null);
    }
    await loadChats();
  }, [currentChat, loadChats]);

  return {
    currentChat,
    chats,
    isLoading,
    loadChats,
    loadChat,
    createNewChat,
    sendMessage,
    deleteChat,
    setCurrentChat,
  };
}
