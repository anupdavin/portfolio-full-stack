import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ExternalLink, MessageCircle, Zap, TrendingUp, Shield, Clock, Github } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { portfolioContent } from '@/content/portfolio'

const techColors: Record<string, string> = {
  'Spring AI': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Spring Boot': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Java 21': 'bg-red-500/20 text-red-400 border-red-500/50',
  'Java 21/25': 'bg-red-500/20 text-red-400 border-red-500/50',
  Kubernetes: 'bg-blue-600/20 text-blue-300 border-blue-600/50',
  'Apache Kafka': 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  Kafka: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  'Kafka / CDC': 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  PostgreSQL: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
  pgvector: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
  'TIBCO EBX': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'MCP': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  'Maven': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
}

type Project = (typeof portfolioContent.caseStudies)[number]

const projects = portfolioContent.caseStudies

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const categories = ['All', ...new Set(projects.map((project) => project.category))]
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter)

  const techStackVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const techItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ git log --case-studies</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Public-safe evidence of how I approach <span className="text-green-400 font-bold">AI, data, platforms, and distributed systems</span>.
        </p>
        <p className="text-sm text-gray-500 mt-2">Each record is labeled as documented evidence, sanitized experience, or a portfolio lab.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant={activeFilter === category ? 'default' : 'outline'} onClick={() => setActiveFilter(category)}>
              {category}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.div layout className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -10 }}>
              <Card className="hover:border-green-400/50 transition-all duration-500 project-card cursor-pointer group overflow-hidden h-full" onClick={() => setSelectedProject(project)}>
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-green-950/40">
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 text-xs font-mono text-green-300/80">case/{project.id}</div>
                  <Badge className="absolute top-4 right-4">{project.category}</Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-cyan-300 bg-black/60 px-2 py-1 rounded border border-cyan-400/20">{project.status}</span>
                  </div>
                </div>
                <CardHeader className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="text-xs text-gray-500 mb-4">{project.clientType}</div>
                  <motion.div className="flex flex-wrap gap-2 mb-4" variants={techStackVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {project.tech.slice(0, 4).map((tech) => (
                      <motion.div key={tech} variants={techItemVariants}>
                        <Badge variant="outline" className={`text-xs ${techColors[tech] || 'border-gray-600 text-gray-300'}`}>{tech}</Badge>
                      </motion.div>
                    ))}
                    {project.tech.length > 4 && <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">+{project.tech.length - 4}</Badge>}
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center p-3 rounded bg-gray-800/50 border border-gray-700/50 group-hover:border-green-400/30 transition-colors">
                        <div className="text-green-400 font-bold text-lg">{value}</div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs text-gray-500 group-hover:text-green-400 transition-colors">Open evidence record →</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="bg-black border border-green-400/50 rounded-xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto glow-border" onClick={(event) => event.stopPropagation()}>
              <div className="flex justify-between items-start mb-6 gap-4">
                <div>
                  <motion.h3 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</motion.h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="bg-green-600 text-black px-2 py-1 rounded text-xs font-bold">{selectedProject.category}</span>
                    <span className="text-cyan-400 text-sm">{selectedProject.clientType}</span>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} className="border border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400 p-2 rounded-full transition-colors" onClick={() => setSelectedProject(null)} aria-label="Close case study">✕</motion.button>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-400/20">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <h4 className="text-sm font-bold text-green-400 flex items-center gap-2"><Zap className="w-4 h-4" /> Problems this approach addresses</h4>
                  <span className="text-xs text-gray-500">{selectedProject.sourceNote}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.problemsSolved.map((problem) => <span key={problem} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">✓ {problem}</span>)}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2"><Shield className="w-5 h-5" /> Technical challenge</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.details.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Solution architecture</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.details.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Outcome</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.details.impact}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                        <div className="text-xl md:text-2xl font-bold text-green-400">{value}</div>
                        <div className="text-gray-400 text-xs md:text-sm">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Implementation sketch</h4>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-x-auto">
                      <pre className="text-xs md:text-sm text-green-300 font-mono">{selectedProject.codeSnippet}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">Technology stack</h4>
                    <motion.div className="flex flex-wrap gap-2" variants={techStackVariants} initial="hidden" animate="visible">
                      {selectedProject.tech.map((tech) => <motion.span key={tech} variants={techItemVariants} className={`px-3 py-2 rounded-lg text-sm font-medium border ${techColors[tech] || 'border-gray-600 text-gray-300 bg-gray-800/50'}`}>{tech}</motion.span>)}
                    </motion.div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="p-4 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border border-green-400/30">
                      <p className="text-sm text-gray-300 mb-3"><span className="text-green-400 font-bold">Working on a related system?</span> I can share the decision framework and discuss what is safe to make public.</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-colors" href="#contact" onClick={() => setSelectedProject(null)}><MessageCircle className="w-4 h-4" /> Discuss a similar problem</motion.a>
                        <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-colors" href={portfolioContent.contact.whatsapp} target="_blank" rel="noopener noreferrer"><Clock className="w-4 h-4" /> Quick chat</motion.a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.a whileHover={{ scale: 1.02 }} className="flex-1 border border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400 px-4 py-2 rounded-lg text-center text-sm flex items-center justify-center gap-2 transition-colors" href={portfolioContent.contact.repository} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /> View portfolio source</motion.a>
                      <motion.a whileHover={{ scale: 1.02 }} className="flex-1 border border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400 px-4 py-2 rounded-lg text-center text-sm flex items-center justify-center gap-2 transition-colors" href={`mailto:${portfolioContent.contact.email}?subject=${encodeURIComponent(`Question about ${selectedProject.title}`)}`}><ExternalLink className="w-4 h-4" /> Ask for details</motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 text-center">
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">anup@portfolio:~$ </span>
          <span className="text-green-400">find ./case-studies -maxdepth 1 -type f</span>
          <div className="text-yellow-400 mt-2">→ {projects.length} public-safe records; private details withheld by design.</div>
        </div>
      </motion.div>
    </div>
  )
}

