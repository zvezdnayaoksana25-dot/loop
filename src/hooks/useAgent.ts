import { useState, useCallback, useRef } from 'react';
import { runAgent } from '../agent/agent';
import { generateInsights } from '../agent/insight-engine';
import { autoConsolidate } from '../agent/memory-extractor';
import type { ChatMessage } from '../types';

export function useAgent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeToolCalls, setActiveToolCalls] = useState<string[]>([]);
  const [lastInsights, setLastInsights] = useState<any[]>([]);
  const messageCountRef = useRef(0);

  const sendMessage = useCallback(
    async (
      apiKey: string,
      chatModel: string,
      extractionModel: string,
      messages: ChatMessage[],
      temperature: number
    ) => {
      if (!apiKey) {
        return { content: 'Please set your Groq API key in Settings.', toolCalls: [] };
      }

      setIsProcessing(true);
      setActiveToolCalls([]);

      try {
        const response = await runAgent(
          apiKey,
          chatModel,
          extractionModel,
          messages,
          temperature,
          (toolName) => setActiveToolCalls((prev) => [...prev, toolName])
        );

        messageCountRef.current += 1;
        return response;
      } finally {
        setIsProcessing(false);
        setActiveToolCalls([]);
      }
    },
    []
  );

  const runInsightAnalysis = useCallback(
    async (apiKey: string, model: string) => {
      if (!apiKey) return [];
      setIsProcessing(true);
      try {
        const insights = await generateInsights(apiKey, model);
        setLastInsights(insights);
        return insights;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const runConsolidation = useCallback(
    async (apiKey: string, model: string) => {
      if (!apiKey) return;
      setIsProcessing(true);
      try {
        await autoConsolidate(apiKey, model);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    isProcessing,
    activeToolCalls,
    lastInsights,
    sendMessage,
    runInsightAnalysis,
    runConsolidation,
  };
}
