import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Capability } from '@/content/portfolio'
import { portfolioContent } from '@/content/portfolio'

const capabilityIcons: Record<string, string> = {
  'ai-native': '✦',
  platform: '☁️',
  'data-mdm': '🗄️',
  'distributed-systems': '⇄',
  'enterprise-delivery': '◎',
}

export default function TechStack() {
  const [selectedId, setSelectedId] = useState(portfolioContent.capabilities[0].id)
  const [hoveredCapability, setHoveredCapability] = useState<Capability | null>(null)
  const selectedCapability = portfolioContent.capabilities.find(({ id }) => id === selectedId) ?? portfolioContent.capabilities[0]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ ls -la /capabilities/</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A capability map grounded in delivery evidence, not percentage proficiency scores.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {portfolioContent.capabilities.map((capability) => (
          <motion.button
            key={capability.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedId(capability.id)}
            onHoverStart={() => setHoveredCapability(capability)}
            onHoverEnd={() => setHoveredCapability(null)}
            className={`px-5 py-3 rounded-lg border transition-all duration-300 ${selectedId === capability.id ? 'border-green-400 bg-green-400/10 text-green-400 glow-border' : 'border-gray-600 text-gray-400 hover:border-gray-500'}`}
          >
            <span className="mr-2">{capabilityIcons[capability.id] ?? '◇'}</span>
            {capability.label}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={selectedCapability.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6"
      >
        <div className="bg-black/60 border border-gray-700 rounded-xl p-6 md:p-8">
          <div className="text-4xl text-green-400 mb-5">{capabilityIcons[selectedCapability.id] ?? '◇'}</div>
          <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">Capability track</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedCapability.label}</h3>
          <p className="text-gray-300 leading-relaxed">{selectedCapability.summary}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {selectedCapability.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1.5 rounded border border-green-400/30 bg-green-400/5 text-green-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h4 className="text-xl font-bold text-green-400">Evidence surfaced</h4>
            <span className="text-xs text-gray-500 font-mono">source: portfolio-content.ts</span>
          </div>
          <div className="space-y-4">
            {selectedCapability.evidence.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 text-gray-300 leading-relaxed"
              >
                <span className="text-green-400 font-mono">[{String(index + 1).padStart(2, '0')}]</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {hoveredCapability && hoveredCapability.id !== selectedCapability.id && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-5 rounded-lg bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/30">
          <span className="text-green-400 font-bold">Preview:</span> {hoveredCapability.label} — {hoveredCapability.summary}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 text-center">
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">anup@portfolio:~$ </span>
          <span className="text-green-400">grep -r "evidence" ./capabilities</span>
          <div className="text-yellow-400 mt-2">→ {portfolioContent.capabilities.length} capability tracks, each with a trail to inspect.</div>
        </div>
      </motion.div>
    </div>
  )
}

