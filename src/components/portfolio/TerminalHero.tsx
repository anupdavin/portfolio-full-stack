import { motion } from 'framer-motion'
import { CheckCircle, Download, MessageCircle } from 'lucide-react'
import { portfolioContent } from '@/content/portfolio'
import ThreeAgentScene from './ThreeAgentScene'

export default function TerminalHero() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_15%,rgba(34,197,94,0.10),transparent_34%),radial-gradient(circle_at_82%_34%,rgba(37,99,235,0.13),transparent_32%)]" />

      <div className="relative grid lg:grid-cols-[0.92fr_1.08fr] gap-10 xl:gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85 }} className="space-y-6 z-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 text-xs md:text-sm bg-green-900/20 text-green-300 px-3 py-1.5 rounded-full border border-green-400/25">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI-native systems • human-reviewed delivery
          </motion.div>

          <div>
            <div className="text-blue-400 text-sm md:text-base font-mono mb-4">$ ./architect --plan --challenge --ship</div>
            <h1 className="text-5xl md:text-7xl xl:text-[5.2rem] font-black leading-[0.95] tracking-tight">
              <span className="text-white">Build the system.</span>
              <br />
              <span className="text-green-400">Orchestrate the intelligence.</span>
            </h1>
          </div>

          <div className="space-y-3 max-w-xl">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">{portfolioContent.identity.headline}</p>
            <p className="text-gray-400 leading-relaxed">{portfolioContent.identity.subline}</p>
            <p className="text-sm md:text-base text-cyan-300/90 font-mono">plan → challenge → implement → verify → learn</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {[
              ['Agent workflows', 'Skills, tools, MCP, review gates'],
              ['Platform depth', 'Java, data, cloud, distributed systems'],
              ['Codebase intelligence', 'Maps, dependency graphs, system context'],
              ['Production discipline', 'Local sandbox, tests, security, observability'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl border border-gray-700/80 bg-black/45 p-4 backdrop-blur">
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">{detail}</div>
              </div>
            ))}
          </div>

          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-lg flex items-center gap-2 transition-colors" href="#ai-lab">
              <MessageCircle className="w-5 h-5" />
              Explore AI Engineering OS
            </motion.a>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="border border-blue-400/70 text-blue-300 hover:bg-blue-400 hover:text-black font-bold px-5 py-3 rounded-lg flex items-center gap-2 transition-colors" href={`mailto:${portfolioContent.contact.email}?subject=Resume%20request%20from%20portfolio`}>
              <Download className="w-5 h-5" />
              Request Résumé
            </motion.a>
          </motion.div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-gray-500">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />{portfolioContent.proofPoints[0].value} {portfolioContent.proofPoints[0].label}</span>
            <span>📍 {portfolioContent.identity.location}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative">
          <ThreeAgentScene />
          <div className="absolute -bottom-3 left-5 right-5 h-12 bg-green-400/10 blur-3xl pointer-events-none" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="relative mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
        {portfolioContent.proofPoints.map((stat) => (
          <div key={stat.label} className="text-center p-4 rounded-xl border border-gray-800 bg-black/45">
            <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[11px] md:text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
