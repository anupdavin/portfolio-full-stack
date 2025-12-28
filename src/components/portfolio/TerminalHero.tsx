import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Download, Mail, Database, Server, MessageCircle, CheckCircle, TrendingUp, Shield } from 'lucide-react'

const codeLines = [
  'public class FullStackDeveloper {',
  '    private String name = "Anup Davin Mathivanan";',
  '    private int yearsExperience = 8;',
  '    private List<String> expertise = Arrays.asList(',
  '        "Spring Boot", "Microservices", "React",',
  '        "AWS", "Docker", "Kubernetes"',
  '    );',
  '    ',
  '    // Results delivered for clients',
  '    public void buildScalableSystems() {',
  '        achieve("99.9% uptime");',
  '        achieve("40% cost reduction");',
  '        achieve("10K+ requests/second");',
  '    }',
  '}'
]

// Client-focused value propositions
const VALUE_PROPS = [
  { icon: TrendingUp, text: '99.9% uptime systems', color: 'text-green-400' },
  { icon: Shield, text: '40% cost reduction', color: 'text-blue-400' },
  { icon: CheckCircle, text: '100K+ daily transactions', color: 'text-purple-400' },
]

export default function TerminalHero(){
  const [displayedCode, setDisplayedCode] = useState<string[]>([''])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping] = useState(true)

  useEffect(() => {
    if (!isTyping || currentLine >= codeLines.length) return
    const timer = setTimeout(() => {
      const line = codeLines[currentLine]
      if (currentChar < line.length) {
        setDisplayedCode(prev => {
          const next = [...prev]
          next[currentLine] = line.substring(0, currentChar + 1)
          return next
        })
        setCurrentChar(c => c + 1)
      } else {
        setCurrentChar(0)
        setCurrentLine(l => l + 1)
        setDisplayedCode(prev => [...prev, ''])
      }
    }, Math.random() * 50 + 30)
    return () => clearTimeout(timer)
  }, [currentChar, currentLine, isTyping])

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-6">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="inline-flex items-center gap-2 text-sm bg-green-900/30 text-green-400 px-3 py-1 rounded-full border border-green-400/30"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Available for new projects
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-blue-400 text-lg md:text-xl font-mono">
              $ ./hire --senior-engineer
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Anup Davin</span>
              <br />
              <motion.span 
                className="text-green-400"
                animate={{ textShadow: ['0 0 10px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.8)', '0 0 10px rgba(34, 197, 94, 0.5)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Mathivanan
              </motion.span>
            </h1>
            <div className="text-lg md:text-xl text-gray-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-400">❯</span>
                <span>Senior Full-Stack Java Architect</span>
              </div>
              <div className="text-purple-400 text-base">// Enterprise Systems • Microservices • Cloud & DevOps</div>
            </div>
          </div>
          
          {/* Value Propositions */}
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {VALUE_PROPS.map((prop, i) => (
              <motion.div 
                key={prop.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className={`flex items-center gap-2 ${prop.color} text-sm bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-700`}
              >
                <prop.icon className="w-4 h-4" />
                {prop.text}
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-500 text-black font-bold px-5 py-3 rounded-lg flex items-center gap-2 transition-colors" 
              href="#contact"
            >
              <MessageCircle className="w-5 h-5" />
              Discuss Your Project
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-bold px-5 py-3 rounded-lg flex items-center gap-2 transition-colors" 
              href="#"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>
          
          {/* Trust signals */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>8+ years enterprise experience</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Singapore / India • Remote Ready</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Code Terminal */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
          <motion.div 
            className="bg-gray-900 rounded-xl p-5 border border-gray-700 shadow-2xl"
            whileHover={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}
            style={{ boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)' }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm font-mono">Developer.java</span>
              </div>
            </div>
            <div className="text-xs md:text-sm font-mono space-y-0.5 overflow-x-auto">
              {displayedCode.map((line, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
                  <span className="text-gray-600 w-6 text-right mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  <span className={`${line.includes('//') ? 'text-gray-500' : 'text-green-300'}`}>
                    {line}
                    {index === currentLine && isTyping && (<span className="bg-green-400 text-black ml-0.5">█</span>)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-blue-500/20"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Database className="w-6 h-6 text-blue-400" />
          </motion.div>
          <motion.div 
            className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-green-500/20"
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1 }}
          >
            <Server className="w-5 h-5 text-green-400" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.3 }} 
        className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
      >
        {[
          { label: 'Years Experience', value: '8+', color: 'text-green-400' },
          { label: 'Projects Deployed', value: '50+', color: 'text-blue-400' },
          { label: 'Lines of Code', value: '1M+', color: 'text-purple-400' },
          { label: 'Client Satisfaction', value: '100%', color: 'text-yellow-400' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 197, 94, 0.5)' }}
            className="text-center p-4 md:p-6 rounded-xl border border-gray-700 bg-black/50 transition-colors"
          >
            <motion.div 
              className={`text-2xl md:text-3xl font-bold ${stat.color}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 + i * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

