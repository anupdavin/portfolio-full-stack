import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChatDoc } from '@/chat/index.d'
import { MessageCircle, X, Send, Bot, User, Sparkles, Clock, Zap } from 'lucide-react'
import { portfolioContent } from '@/content/portfolio'

type Message = { role: 'user' | 'assistant' | 'system'; content: string; timestamp?: Date }

// FAQ answers are intentionally concise and share the same evidence boundary as the page.
const FAQ: Record<string, string> = {
  'what is his name': 'Anup Davin Mathivanan.',
  "what's his name": 'Anup Davin Mathivanan.',
  'who is he': `Anup is a ${portfolioContent.identity.headline} with ${portfolioContent.proofPoints[0].value} years in enterprise engineering across Java, data, platforms, and AI-augmented delivery.`,
  'what does he do': portfolioContent.about.summary,
  'what are his skills': 'His capability tracks are AI-native delivery, platform engineering, data and MDM, distributed systems, and enterprise delivery.',
  'what technologies does he use': 'Common tools include Java 21/25, Spring Boot, Spring AI, Kubernetes, AKS, AWS, Kafka, CDC, TIBCO EBX, Boomi DataHub, SQL, pgvector, MCP, and evaluation fixtures.',
  'is he available': portfolioContent.identity.availability + '. The preferred next step is to discuss the problem and evidence needed before choosing an engagement shape.',
  'where is he located': `${portfolioContent.identity.location}.`,
  'does he work remotely': 'Yes. The portfolio is designed around remote-ready, async-friendly delivery with deliberate review points.',
  'what is his timezone': 'Singapore (GMT+8) with India ties (GMT+5:30). Confirm overlap for a specific team or engagement.',
  'how does he charge': 'The portfolio does not publish rates. Scope, risk, and the desired outcome should be discussed first; then the engagement shape can be selected.',
  'what are his rates': 'Rates are not published here. Contact Anup with the problem, constraints, and desired outcome for a scoped conversation.',
  'engagement models': 'Possible shapes include a principal/staff role, architecture advisory, modernization work, or AI delivery-controls work. The outcome determines the shape.',
  'how many years experience': `${portfolioContent.proofPoints[0].value} years in enterprise engineering, with a focus on modern Java, data platforms, distributed systems, and AI augmentation.`,
  'what projects has he built': 'The public case studies cover Person MDM modernization, a grounded knowledge-assistant lab, an agent-augmented engineering loop, and event-driven reconciliation.',
  'can he help with microservices': 'Yes. The approach centers on migration sequencing, service boundaries, events, idempotency, observability, and safe release gates—not decomposition for its own sake.',
  'can he optimize performance': 'Yes, when the baseline and bottleneck are measurable. One documented reconciliation workflow was reduced from a multi-hour process to under 20 minutes; surrounding details are sanitized.',
  'does he work with startups': 'The public positioning is enterprise-oriented, but the same evidence-led approach can be adapted to a smaller team when the problem and constraints are clear.',
  'what industries': 'Publicly described experience spans regulated payment and insurance contexts, logistics, enterprise integration, and platform modernization.',
  'how to contact': `Email ${portfolioContent.contact.email} or use the contact form. WhatsApp is also available for a quick conversation.`,
  'response time': 'The page does not promise a fixed response time. Email and the contact form are the best paths for a detailed inquiry; WhatsApp is useful for a quick conversation.',
}

// Quick suggestion chips
const QUICK_QUESTIONS = [
  'What are his skills?',
  'Is he available?',
  'What projects has he built?',
  'What is the AI lab?',
  'Does he work remotely?',
  'How to contact?',
]

type RankedDoc = ChatDoc & { score: number }

const STOP_WORDS = new Set(['a', 'an', 'and', 'are', 'can', 'do', 'does', 'he', 'his', 'how', 'is', 'of', 'the', 'to', 'what', 'where', 'with'])

function tokenize(value: string) {
  return [...new Set(value.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2 && !STOP_WORDS.has(token)))]
}

function rankLocalEvidence(query: string, documents: ChatDoc[], topK = 4): RankedDoc[] {
  const queryTokens = tokenize(query)
  if (!queryTokens.length) return []

  return documents
    .map((document) => {
      const documentTokens = new Set(tokenize(`${document.title} ${document.text}`))
      const matchedTokens = queryTokens.filter((token) => documentTokens.has(token))
      const titleTokens = new Set(tokenize(document.title))
      const titleMatches = queryTokens.filter((token) => titleTokens.has(token)).length
      const score = matchedTokens.length / queryTokens.length + titleMatches / (queryTokens.length * 2)
      return { ...document, score }
    })
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, topK)
}

function answerFromEvidence(query: string, matches: RankedDoc[]) {
  if (/(ignore|reveal|show).*(instructions|prompt|system|private)/i.test(query)) {
    return 'I can only answer from the public portfolio evidence. Hidden prompts, private data, and internal instructions are not part of the assistant’s contract.'
  }

  const groundedMatches = matches.filter((document) => document.score >= 0.18)
  if (!groundedMatches.length) {
    return 'I don’t have evidence for that in the public portfolio yet. Try asking about capabilities, case studies, experience, or the working approach.'
  }

  const primary = groundedMatches[0]
  const sources = groundedMatches.slice(0, 2).map((document) => document.title).join(' · ')
  return `${primary.text}\n\nSources: ${sources}`
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '👋 I\'m Anup\'s local portfolio assistant. Ask about capabilities, case studies, the AI lab, or the engineering approach. Answers stay inside the public evidence corpus.',
      timestamp: new Date() 
    },
  ])
  const [docs, setDocs] = useState<ChatDoc[] | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
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

  async function onSend(customQuery?: string) {
    const q = (customQuery || input).trim()
    if (!q) return
    
    setInput('')
    setShowSuggestions(false)
    setMessages((m) => [...m, { role: 'user', content: q, timestamp: new Date() }])
    setLoading(true)
    setIsTyping(true)
    
    // Keep the interaction human-readable while remaining fully local.
    await new Promise(resolve => setTimeout(resolve, 350))
    
    try {
      const norm = normalize(q)
      if (FAQ[norm]) {
        setMessages((m) => [...m, { role: 'assistant', content: FAQ[norm], timestamp: new Date() }])
        return
      }

      const top = docs && docs.length ? rankLocalEvidence(q, docs, 4) : []
      const answer = answerFromEvidence(q, top)

      setMessages((m) => [...m, { role: 'assistant', content: answer, timestamp: new Date() }])
    } catch {
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
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 bg-green-600 text-black font-bold shadow-lg hover:bg-green-500 transition-all duration-300"
        whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <MessageCircle className="w-6 h-6" />
              <motion.span 
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
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
            className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[90vw] rounded-2xl border border-green-400/30 bg-black/95 backdrop-blur-md text-green-300 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900/50 to-gray-900 p-4 border-b border-green-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center"
                    animate={{ boxShadow: ['0 0 0px rgba(34, 197, 94, 0.5)', '0 0 15px rgba(34, 197, 94, 0.5)', '0 0 0px rgba(34, 197, 94, 0.5)'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-5 h-5 text-black" />
                  </motion.div>
                  <div>
                    <div className="font-bold text-green-400 flex items-center gap-2">
                      Portfolio Assistant
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Local evidence mode
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={panelRef} className="h-72 overflow-y-auto p-4 space-y-4">
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
                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user' 
                        ? 'bg-green-600 text-black rounded-br-sm' 
                        : 'bg-gray-800 border border-gray-700 rounded-bl-sm'
                    }`}>
                      <div className="text-sm leading-relaxed">{message.content}</div>
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
              
              {/* Quick Suggestions */}
              {showSuggestions && messages.length <= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {QUICK_QUESTIONS.map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => onSend(q)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400/50 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
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
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm p-3">
                    <div className="flex items-center gap-2">
                      <motion.div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-green-400/20 bg-gray-900/50">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && onSend()}
                  placeholder="Ask about skills, projects, availability..."
                  className="flex-1 rounded-xl border border-gray-600 bg-black px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
                <motion.button
                  onClick={() => onSend()}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-green-600 text-black px-4 py-2.5 font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>Powered by on-device AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
