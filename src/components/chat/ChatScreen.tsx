import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, Settings } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAgent } from '../../hooks/useAgent';
import type { ChatMessage } from '../../types';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ChatHistoryDrawer } from './ChatHistoryDrawer';

interface ChatScreenProps {
  apiKey: string;
  chatModel: string;
  extractionModel: string;
  temperature: number;
  insightFrequency: number;
  onOpenSettings: () => void;
}

export function ChatScreen({
  apiKey,
  chatModel,
  extractionModel,
  temperature,
  insightFrequency,
  onOpenSettings,
}: ChatScreenProps) {
  const { currentChat, chats, loadChats, loadChat, createNewChat, sendMessage, deleteChat } = useChat();
  const { isProcessing, activeToolCalls, sendMessage: agentSend, runInsightAnalysis } = useAgent();
  const [showHistory, setShowHistory] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    if (currentChat) {
      setLocalMessages(currentChat.messages);
    } else {
      setLocalMessages([]);
    }
  }, [currentChat]);

  const handleSend = useCallback(async (content: string) => {
    if (!content.trim() || isProcessing) return;

    let chatId = currentChat?.id;
    if (!chatId) {
      chatId = await createNewChat();
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setLocalMessages((prev) => [...prev, userMessage]);
    await sendMessage(chatId!, userMessage);

    const allMessages = [...localMessages, userMessage];
    setStreamingText('');

    const response = await agentSend(
      apiKey,
      chatModel,
      extractionModel,
      allMessages,
      temperature,
      (chunk) => setStreamingText((prev) => prev + chunk)
    );

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
    };

    setLocalMessages((prev) => [...prev, assistantMessage]);
    await sendMessage(chatId!, assistantMessage);

    if (localMessages.length > 0 && localMessages.length % insightFrequency === 0) {
      await runInsightAnalysis(apiKey, extractionModel);
    }
  }, [currentChat, isProcessing, localMessages, apiKey, chatModel, extractionModel, temperature, insightFrequency, createNewChat, sendMessage, agentSend, runInsightAnalysis]);

  const handleNewChat = useCallback(async () => {
    await createNewChat();
    setLocalMessages([]);
    setShowHistory(false);
  }, [createNewChat]);

  const handleSelectChat = useCallback(async (id: number) => {
    await loadChat(id);
    setShowHistory(false);
  }, [loadChat]);

  const handleDeleteChat = useCallback(async (id: number) => {
    await deleteChat(id);
  }, [deleteChat]);

  const handleAnalyze = useCallback(async () => {
    if (!apiKey) return;
    const insights = await runInsightAnalysis(apiKey, extractionModel);
    if (insights.length > 0) {
      const insightMessage: ChatMessage = {
        role: 'assistant',
        content: `## Insights Analysis\n\nI found ${insights.length} insights:\n\n${insights.map((i) => `- **${i.title}**: ${i.content}`).join('\n')}`,
        timestamp: new Date(),
      };
      setLocalMessages((prev) => [...prev, insightMessage]);
      if (currentChat?.id) {
        await sendMessage(currentChat.id, insightMessage);
      }
    }
  }, [apiKey, extractionModel, runInsightAnalysis, currentChat, sendMessage]);

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-primary)] shrink-0">
        <button
          onClick={() => setShowHistory(true)}
          className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          <Menu size={20} color="var(--text-primary)" />
        </button>
        <h1 className="text-base font-semibold text-[var(--text-primary)]">Second Brain</h1>
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          <Settings size={20} color="var(--text-primary)" />
        </button>
      </header>

      <div className="flex-1 overflow-hidden min-h-0">
        <MessageList
          messages={localMessages}
          streamingContent={streamingText}
          activeToolCalls={activeToolCalls}
          isProcessing={isProcessing}
        />
      </div>

      <div className="px-3 pb-2 pt-1 bg-[var(--bg-primary)] shrink-0">
        <ChatInput
          onSend={handleSend}
          onAnalyze={handleAnalyze}
          onNewChat={handleNewChat}
          isProcessing={isProcessing}
          inputRef={inputRef}
        />
      </div>

      {showHistory && (
        <ChatHistoryDrawer
          chats={chats}
          currentChatId={currentChat?.id}
          onSelect={handleSelectChat}
          onDelete={handleDeleteChat}
          onNew={handleNewChat}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
