import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { rankBySimilarity } from '@/lib/embeddings'
import { generateAnswer } from '@/lib/generator'
import type { ChatDoc } from '@/chat/index.d'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'

type Message = { role: 'user' | 'assistant' | 'system'; content: string; timestamp?: Date }

const FAQ: Record<string, string> = {
  'what is his name': 'Anup Davin Mathivanan.',
  "what's his name": 'Anup Davin Mathivanan.',
  'who is he': 'Anup Davin Mathivanan is a Senior Full‑Stack Java/DevOps engineer.',
  'what does he do': 'Anup is a Senior Full-Stack Java Developer specializing in Enterprise Architecture, Cloud Solutions, and DevOps.',
  'what are his skills': 'Anup specializes in Java, Spring Boot, React, AWS, Docker, Kubernetes, and has expertise in microservices, cloud infrastructure, and performance optimization.',
  'where is he located': 'Anup is based in Singapore/India and is available for new opportunities.',
  'is he available': 'Yes, Anup is available for new opportunities and open to remote work.',
  'what projects has he built': 'Anup has built an E-Commerce Microservices Platform handling 100K+ daily transactions and a Real-time Analytics Dashboard processing 1M+ events per minute.',
  'how many years experience': 'Anup has 8+ years of experience in full-stack development.',
  'what technologies does he use': 'Anup uses Java, Spring Boot, React, TypeScript, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, and many other modern technologies.'
}

function safetyFilter(s: string): boolean {
  const forbidden = [/email/i, /phone/i, /whatsapp/i, /credit/i, /password/i]
  return !forbidden.some((re) => re.test(s))
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I can help you learn about Anup\'s experience, projects, skills, and more. What would you like to know?', timestamp: new Date() },
  ])
  const [docs, setDocs] = useState<ChatDoc[] | null>(null)
  const [isTyping, setIsTyping] = useState(false)
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

  function normalize(q: string) {
    return q.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
  }

  async function onSend() {
    const q = input.trim()
    if (!q) return
    
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: q, timestamp: new Date() }])
    setLoading(true)
    setIsTyping(true)
    
    // Simulate typing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      const norm = normalize(q)
      if (FAQ[norm]) {
        setMessages((m) => [...m, { role: 'assistant', content: FAQ[norm], timestamp: new Date() }])
        return
      }

      const top = docs && docs.length ? await rankBySimilarity(q, docs, 4) : []
      const context = top
        .map((t, i) => `[#${i + 1}] ${t.title}${t.url ? ` (${t.url})` : ''}\n${t.text}`)
        .join('\n\n')

      const system = [
        'You are an assistant for a personal portfolio site.',
        'Only answer from CONTEXT. If the answer is not in CONTEXT, reply: "I don\'t know."',
        'Be concise and professional. Do not request contact information or personal data.',
        'If asked for the person\'s name, reply exactly: "Anup Davin Mathivanan."',
      ].join(' ')

      const prompt = `${system}\n\nCONTEXT:\n${context || '(none)'}\n\nUSER: ${q}\nASSISTANT:`
      let completion = await generateAnswer(prompt, { maxNewTokens: 80 })
      let answer = completion.replace(/^[\s\S]*ASSISTANT:\s*/i, '').trim()

      if (!safetyFilter(answer)) {
        answer = 'I can\'t help with that. Please ask about experience, projects, or skills.'
      }

      if (!answer || /i don.?t know/i.test(answer)) {
        // Try to extract a fact from context for fallback
        const nameHit = top.find((d) => /Anup Davin Mathivanan/i.test(d.text))
        if (/name/i.test(q) && nameHit) answer = 'Anup Davin Mathivanan.'
        else if (!answer) answer = 'I don\'t have information about that. Try asking about Anup\'s skills, projects, or experience.'
      }

      setMessages((m) => [...m, { role: 'assistant', content: answer, timestamp: new Date() }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I ran into an issue. Please try again.', timestamp: new Date() }])
    } finally {
      setLoading(false)
      setIsTyping(false)
    }
  }

  return (
    <div>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-24 z-50 rounded-full p-4 bg-green-600 text-black font-bold shadow-lg hover:bg-green-500 transition-all duration-300 glow-border"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-24 right-24 z-40 w-[400px] max-w-[90vw] rounded-xl border border-green-400/30 bg-black/95 backdrop-blur-md text-green-300 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-400/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="font-bold text-green-400">Portfolio Assistant</div>
                  <div className="text-xs text-gray-400">Ask about Anup's work</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={panelRef} className="h-80 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-green-600 text-black' 
                        : 'bg-gray-800 border border-gray-700'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      {message.timestamp && (
                        <div className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-green-800' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-green-400/20">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && onSend()}
                  placeholder="Ask about experience, projects, skills..."
                  className="flex-1 rounded-lg border border-green-400/30 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={loading}
                />
                <motion.button
                  onClick={onSend}
                  disabled={loading || !input.trim()}
                  className="rounded-lg bg-green-600 text-black px-3 py-2 text-sm font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="mt-2 text-xs text-gray-400 text-center">
                💡 Try: "What are his skills?" or "Tell me about his projects"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

