import { useEffect, useMemo, useRef, useState } from 'react'
import { rankBySimilarity } from '@/lib/embeddings'
import { generateAnswer } from '@/lib/generator'
import type { ChatDoc } from '@/chat/index.d'

type Message = { role: 'user' | 'assistant' | 'system'; content: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Ask me about Anup’s experience, projects, or skills.' },
  ])
  const [docs, setDocs] = useState<ChatDoc[] | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && !docs) {
      fetch(`${import.meta.env.BASE_URL}chat/index.json`)
        .then((r) => r.json())
        .then((d) => setDocs(d))
        .catch(() => setDocs([]))
    }
  }, [open, docs])

  useEffect(() => {
    if (open) {
      panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight })
    }
  }, [messages, open])

  async function onSend() {
    const q = input.trim()
    if (!q) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: q }])
    setLoading(true)
    try {
      const top = docs && docs.length ? await rankBySimilarity(q, docs, 4) : []
      const context = top
        .map((t, i) => `[#${i + 1}] ${t.title}${t.url ? ` (${t.url})` : ''}\n${t.text}`)
        .join('\n\n')

      const system =
        'You are an assistant for a personal portfolio site. Answer briefly and professionally, grounded ONLY in the provided CONTEXT. If not in context, say you do not know.'
      const prompt = `${system}\n\nCONTEXT:\n${context || '(none)'}\n\nUSER: ${q}\nASSISTANT:`
      const completion = await generateAnswer(prompt, { maxNewTokens: 128 })
      const answer = completion.replace(/^[\s\S]*ASSISTANT:\s*/i, '').trim()
      setMessages((m) => [...m, { role: 'assistant', content: answer || '(No answer generated)'}])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I ran into an issue. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 bg-green-600 text-black font-bold shadow-lg hover:bg-green-500"
      >
        {open ? 'Close Chat' : 'Chat'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw] rounded-xl border border-green-400/30 bg-black/85 backdrop-blur p-3 text-green-300 shadow-xl">
          <div className="text-sm font-bold text-green-400 pb-2 border-b border-green-400/20">Portfolio Chat</div>
          <div ref={panelRef} className="mt-2 h-64 overflow-y-auto pr-1 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-white' : 'text-green-300'}>
                {m.content}
              </div>
            ))}
            {loading && <div className="text-green-500">Thinking…</div>}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder="Ask about experience, projects, skills…"
              className="flex-1 rounded-md border border-green-400/30 bg-black px-2 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button onClick={onSend} disabled={loading} className="rounded-md bg-green-600 text-black px-3 py-2 text-sm font-bold hover:bg-green-500 disabled:opacity-50">
              Send
            </button>
          </div>
          <div className="mt-1 text-[10px] text-gray-400">Runs fully in your browser. No data leaves your device.</div>
        </div>
      )}
    </div>
  )
}

