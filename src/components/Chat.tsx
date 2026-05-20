import { useState, useRef, useEffect, useCallback } from 'react'
import type { Message, Settings } from '../types'
import { buildChatContext, saveAndProcessSession } from '../memory/pipeline'
import { chatCompletion } from '../groq/client'

interface ChatProps {
  settings: Settings
  onSessionEnd: () => void
}

export default function Chat({ settings, onSessionEnd }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const contextMessages = await buildChatContext(userMessage.content, settings)
      const allMessages = [...contextMessages, userMessage]
      const response = await chatCompletion(allMessages, settings.model_main, 0.7)

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Ошибка: ' + (err instanceof Error ? err.message : 'Не удалось получить ответ. Проверь API ключ.'),
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }, [input, loading, settings])

  const handleNewSession = useCallback(async () => {
    if (messages.length === 0) return
    if (!confirm('Завершить текущую сессию и начать новую?')) return

    setProcessing(true)

    try {
      const allSessionMessages = messages.filter(m => m.role !== 'system')
      await saveAndProcessSession(allSessionMessages, settings)
      setMessages([])
      onSessionEnd()
    } catch (err) {
      console.error('Failed to save session:', err)
    } finally {
      setProcessing(false)
    }
  }, [messages, settings, onSessionEnd])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {messages.length > 0 && (
        <div className="border-b border-[var(--border)] px-4 py-2 flex justify-between items-center">
          <span className="text-xs text-[var(--text-muted)]">
            {messages.filter(m => m.role === 'user').length} сообщений в этой сессии
          </span>
          <button
            onClick={handleNewSession}
            disabled={processing}
            className="text-xs bg-[var(--accent)] hover:bg-[var(--accent-dim)] disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            {processing ? 'Сохраняю...' : 'Новая сессия'}
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-[var(--text-muted)] text-sm mb-1">Начни диалог</p>
            <p className="text-xs text-[var(--text-muted)]">Напиши что происходит — без фильтров</p>
          </div>
        )}

        {messages.filter(m => m.role !== 'system').map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-[var(--accent)] text-white rounded-br-md'
                  : 'bg-[var(--bg-secondary)] text-[var(--text)] rounded-bl-md'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.role === 'user' ? 'text-white/60' : 'text-[var(--text-muted)]'
              }`}>
                {new Date(msg.timestamp).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--bg-secondary)] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {processing && (
          <div className="text-center text-xs text-[var(--text-muted)] py-2">
            Сохраняю сессию...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[var(--border)] p-4">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напиши что происходит..."
            rows={1}
            className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-muted)]"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-[var(--accent)] hover:bg-[var(--accent-dim)] disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors self-end"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
