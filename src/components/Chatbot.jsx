import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useChat } from '../hooks/useChat'

function Chatbot({ issData, newsData }) {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const { messages, sendMessage, isSending, error } = useChat(issData, newsData)

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(draft)
    setDraft('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      {isOpen ? (
        <section className="mb-3 flex h-[520px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
          <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-cyan-600" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold">Dashboard Chatbot</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">ISS and news data only</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid size-8 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 dark:hover:bg-neutral-800"
              aria-label="Close chatbot"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {!messages.length ? (
              <div className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-neutral-700 dark:text-slate-400">
                Ask for the current ISS latitude, longitude, speed, or loaded news headlines.
              </div>
            ) : null}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-md px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'ml-auto bg-cyan-600 text-white'
                    : 'mr-auto bg-slate-100 text-slate-900 dark:bg-neutral-800 dark:text-slate-100'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isSending ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-neutral-800 dark:text-slate-300">
                <Loader2 className="animate-spin" size={15} aria-hidden="true" />
                Thinking
              </div>
            ) : null}
          </div>

          {error ? <p className="border-t border-amber-200 px-4 py-2 text-xs text-amber-700 dark:border-amber-900 dark:text-amber-300">{error}</p> : null}

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-200 p-3 dark:border-neutral-800">
            <label className="sr-only" htmlFor="chat-message">
              Message
            </label>
            <input
              id="chat-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about loaded data"
              className="h-10 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            />
            <button
              type="submit"
              disabled={isSending || !draft.trim()}
              className="grid size-10 place-items-center rounded-md bg-cyan-600 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="grid size-14 place-items-center rounded-full bg-cyan-600 text-white shadow-xl transition hover:bg-cyan-700"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <MessageCircle size={24} aria-hidden="true" />
      </button>
    </div>
  )
}

export default Chatbot
