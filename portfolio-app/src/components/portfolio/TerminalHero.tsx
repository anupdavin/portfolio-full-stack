import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Download, Mail, Database, Server } from 'lucide-react'

const codeLines = [
  'public class FullStackDeveloper {',
  '    private String name = "Anup Davin Mathivanan";',
  '    private List<String> expertise = Arrays.asList(',
  '        "Spring Boot", "Microservices", "React",',
  '        "AWS", "Docker", "Kubernetes"',
  '    );',
  '    @Override',
  '    public void buildAmazingApps() {',
  '        while (true) {',
  '            this.writeCleanCode();',
  '            this.optimizePerformance();',
  '            this.deployToCloud();',
  '        }',
  '    }',
  '}'
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
    <div className="relative w-full max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-8">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-blue-400 text-xl">
              $ echo "Hello World"
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Anup Davin</span>
              <br />
              <span className="text-green-400 glow-text">Mathivanan</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 space-y-2">
              <div className="terminal-cursor">Senior Full-Stack Java Developer</div>
              <div className="text-purple-400">// DevOps | Cloud | Performance</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a className="bg-green-600 hover:bg-green-500 text-black font-bold glow-border group px-4 py-3 rounded" href="#">
              <Download className="w-4 h-4 mr-2 inline group-hover:animate-bounce" />
              Download Resume.pdf
            </a>
            <a className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black glow-border px-4 py-3 rounded" href="#contact">
              <Mail className="w-4 h-4 mr-2 inline" />
              Get In Touch
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for new opportunities
            </div>
            <div>📍 Singapore / India</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
          <div className="code-block rounded-lg p-6 glow-border floating-element">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm">Developer.java</span>
              <div className="ml-auto flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="text-sm font-mono space-y-1">
              {displayedCode.map((line, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
                  <span className="text-gray-600 w-8 text-right mr-4">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-green-300">
                    {line}
                    {index === currentLine && isTyping && (<span className="bg-green-400 text-black ml-1 animate-pulse">█</span>)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-20 floating-element">
            <Database className="w-8 h-8" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center opacity-20 floating-element" style={{ animationDelay: '2s' }}>
            <Server className="w-6 h-6" />
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {[
          { label: 'Years Experience', value: '8+' },
          { label: 'Projects Deployed', value: '50+' },
          { label: 'Lines of Code', value: '1M+' },
          { label: 'Coffee Consumed', value: '∞' },
        ].map((stat) => (
          <motion.div key={stat.label} whileHover={{ scale: 1.05 }} className="text-center p-6 rounded-lg border border-green-400/20 bg-black/50 glow-border">
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

