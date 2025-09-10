import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Microservices Platform',
    category: 'Enterprise Architecture',
    description: 'Scalable microservices architecture handling 100K+ daily transactions',
    tech: ['Spring Boot', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
    details: {
      challenge: 'Legacy monolith causing performance bottlenecks',
      solution: 'Decomposed into 12 microservices with event-driven architecture',
      impact: '99.9% uptime, 60% faster response times, 40% cost reduction',
    },
    metrics: { 'Response Time': '< 200ms', Throughput: '10K RPS', Availability: '99.9%', 'Cost Reduction': '40%' },
    codeSnippet: `@RestController\n@RequestMapping("/api/orders")\npublic class OrderController {\n    @PostMapping\n    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderRequest request) {\n        return ResponseEntity.ok(orderService.processOrder(request));\n    }\n}`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
  },
  {
    id: 2,
    title: 'Real-time Analytics Dashboard',
    category: 'Data Engineering',
    description: 'High-performance analytics processing 1M+ events per minute',
    tech: ['Spring WebFlux', 'Apache Kafka', 'InfluxDB', 'React', 'D3.js'],
    details: {
      challenge: 'Real-time processing of massive data streams',
      solution: 'Event-driven architecture with reactive streams',
      impact: 'Sub-second analytics, 95% reduction in data latency',
    },
    metrics: { 'Events/Min': '1M+', Latency: '< 100ms', 'Data Points': '50B+', Users: '10K+' },
    codeSnippet: `@Component\npublic class EventProcessor {\n  @KafkaListener(topics = "user-events")\n  public void processEvent(@Payload UserEvent event) { /* ... */ }\n}`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  },
]

export default function ProjectsShowcase(){
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const categories = ['All', ...new Set(projects.map(p => p.category))]
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ git log --projects</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Production-ready applications showcasing advanced Java development patterns</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button key={category} onClick={() => setActiveFilter(category)} className={`${activeFilter === category ? 'bg-green-600 text-black glow-border' : 'border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400'} border px-4 py-2 rounded`}>
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}>
              <div className="bg-black/60 border border-gray-700 hover:border-green-400/50 transition-all duration-500 project-card cursor-pointer group overflow-hidden rounded" onClick={() => setSelectedProject(project)}>
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-4 right-4 bg-green-600 text-black px-2 py-1 rounded text-xs">{project.category}</span>
                </div>
                <div className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map(tech => (<span key={tech} className="text-xs border border-gray-600 text-gray-300 px-2 py-1 rounded">{tech}</span>))}
                    {project.tech.length > 4 && (<span className="text-xs border border-gray-600 text-gray-300 px-2 py-1 rounded">+{project.tech.length - 4} more</span>)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center p-2 rounded bg-gray-800/50">
                        <div className="text-green-400 font-bold">{value as string}</div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-black border border-green-400/50 rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto glow-border" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <span className="bg-green-600 text-black px-2 py-1 rounded text-xs">{selectedProject.category}</span>
                </div>
                <button className="border border-gray-600 text-gray-400 px-2 py-1 rounded" onClick={() => setSelectedProject(null)}>✕</button>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">Technical Challenge</h4>
                    <p className="text-gray-300">{selectedProject.details.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">Solution Architecture</h4>
                    <p className="text-gray-300">{selectedProject.details.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Business Impact</h4>
                    <p className="text-gray-300">{selectedProject.details.impact}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 rounded bg-gray-800/50 border border-gray-700">
                        <div className="text-2xl font-bold text-green-400">{value as string}</div>
                        <div className="text-gray-400 text-sm">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-yellow-400">Code Implementation</h4>
                  <div className="code-block rounded-lg p-4">
                    <pre className="text-sm text-green-300 overflow-x-auto">{selectedProject.codeSnippet}</pre>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech: string) => (<span key={tech} className="border border-gray-600 text-gray-300 px-2 py-1 rounded text-xs">{tech}</span>))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 rounded text-center" href="#"><Github className="w-4 h-4 inline mr-2"/>View Source</a>
                    <a className="flex-1 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-4 py-2 rounded text-center" href="#"><ExternalLink className="w-4 h-4 inline mr-2"/>Live Demo</a>
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
          <span className="text-green-400">find ./projects -name "*.java" | wc -l</span>
          <div className="text-yellow-400 mt-2">→ 2,847 Java files and counting... 📈</div>
        </div>
      </motion.div>
    </div>
  )
}

