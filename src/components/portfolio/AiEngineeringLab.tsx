import { motion } from 'framer-motion'
import { CheckCircle2, GitBranch, Search, ShieldCheck } from 'lucide-react'
import { portfolioContent } from '@/content/portfolio'

const traceIcons = [Search, GitBranch, ShieldCheck] as const

export default function AiEngineeringLab() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-14">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ ./ai-lab --explain</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">{portfolioContent.aiLab.summary}</p>
        <p className="text-sm text-yellow-300/80 max-w-3xl mx-auto mt-4 border border-yellow-400/20 bg-yellow-400/5 rounded-lg px-4 py-3">{portfolioContent.aiLab.notice}</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">
        {portfolioContent.aiLab.trace.map((step, index) => {
          const Icon = traceIcons[index]
          return (
            <motion.div key={step.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className="relative bg-black/70 border border-gray-700 hover:border-green-400/50 rounded-xl p-6">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-400/10 border border-green-400/30 grid place-items-center"><Icon className="w-5 h-5 text-green-400" /></div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono">stage {String(index + 1).padStart(2, '0')}</div>
                    <h3 className="text-xl font-bold text-white">{step.label}</h3>
                  </div>
                </div>
                <span className="text-green-400 font-mono">→</span>
              </div>
              <div className="bg-gray-900 rounded-lg border border-gray-700 px-3 py-2 text-sm text-cyan-300 font-mono mb-4">{step.command}</div>
              <p className="text-gray-300 text-sm leading-relaxed">{step.detail}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-8">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-900/70 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-gray-500">Evaluation fixture</div>
              <h3 className="text-2xl font-bold text-white mt-2">What the assistant must prove</h3>
            </div>
            <CheckCircle2 className="w-7 h-7 text-green-400" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {portfolioContent.aiLab.evaluation.map((item) => (
              <div key={item.label} className="border border-gray-700 bg-black/40 rounded-lg p-4">
                <div className="text-sm text-gray-400">{item.label}</div>
                <div className="text-green-300 font-semibold mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-green-900/30 via-gray-900 to-blue-900/30 border border-green-400/30 rounded-xl p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-gray-500">Operating contract</div>
          <h3 className="text-2xl font-bold text-green-400 mt-2 mb-4">Useful, inspectable, bounded.</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-3"><span className="text-green-400">✓</span><span>Public facts stay tied to source records.</span></li>
            <li className="flex gap-3"><span className="text-green-400">✓</span><span>Unsupported questions get an honest fallback.</span></li>
            <li className="flex gap-3"><span className="text-green-400">✓</span><span>Any future model adapter stays behind a tested boundary.</span></li>
          </ul>
          <div className="mt-6 text-xs text-gray-500 font-mono">assistant.mode = "local-evidence"</div>
        </motion.div>
      </div>
    </div>
  )
}
