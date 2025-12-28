import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, MessageCircle, Zap, TrendingUp, Shield, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Tech stack icons/colors for visual categorization
const techColors: Record<string, string> = {
  'Spring Boot': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Docker': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'Kubernetes': 'bg-blue-600/20 text-blue-300 border-blue-600/50',
  'PostgreSQL': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
  'Redis': 'bg-red-500/20 text-red-400 border-red-500/50',
  'AWS': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  'Spring WebFlux': 'bg-green-600/20 text-green-300 border-green-600/50',
  'Apache Kafka': 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  'InfluxDB': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'React': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  'D3.js': 'bg-orange-400/20 text-orange-300 border-orange-400/50',
  'MongoDB': 'bg-green-700/20 text-green-300 border-green-700/50',
  'TypeScript': 'bg-blue-400/20 text-blue-300 border-blue-400/50',
}

const projects = [
  {
    id: 1,
    title: 'E-Commerce Microservices Platform',
    category: 'Enterprise Architecture',
    clientType: 'For scaling e-commerce & retail',
    description: 'Scalable microservices architecture handling 100K+ daily transactions',
    problemsSolved: ['Legacy system bottlenecks', 'High operational costs', 'Slow deployments', 'Single point of failure'],
    tech: ['Spring Boot', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
    details: {
      challenge: 'Legacy monolith causing performance bottlenecks and high operational costs for growing e-commerce business',
      solution: 'Decomposed into 12 microservices with event-driven architecture, implemented CI/CD pipelines, auto-scaling infrastructure',
      impact: '99.9% uptime, 60% faster response times, 40% cost reduction, 10x deployment frequency',
    },
    metrics: { 'Response Time': '< 200ms', Throughput: '10K RPS', Availability: '99.9%', 'Cost Reduction': '40%' },
    codeSnippet: `@RestController\n@RequestMapping("/api/orders")\npublic class OrderController {\n    @PostMapping\n    public ResponseEntity<OrderDTO> createOrder(\n            @RequestBody OrderRequest request) {\n        return ResponseEntity.ok(\n            orderService.processOrder(request));\n    }\n}`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
  },
  {
    id: 2,
    title: 'Real-time Analytics Dashboard',
    category: 'Data Engineering',
    clientType: 'For data-driven enterprises',
    description: 'High-performance analytics processing 1M+ events per minute',
    problemsSolved: ['Data latency issues', 'Batch processing delays', 'Limited real-time insights', 'Scaling challenges'],
    tech: ['Spring WebFlux', 'Apache Kafka', 'InfluxDB', 'React', 'D3.js'],
    details: {
      challenge: 'Real-time processing of massive data streams with sub-second latency requirements for business decisions',
      solution: 'Event-driven architecture with reactive streams, distributed processing, time-series database optimization',
      impact: 'Sub-second analytics, 95% reduction in data latency, enabled real-time business decisions',
    },
    metrics: { 'Events/Min': '1M+', Latency: '< 100ms', 'Data Points': '50B+', Users: '10K+' },
    codeSnippet: `@Component\npublic class EventProcessor {\n    @KafkaListener(topics = "user-events")\n    public Mono<Void> processEvent(\n            @Payload UserEvent event) {\n        return analyticsService\n            .process(event)\n            .subscribeOn(Schedulers.parallel());\n    }\n}`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  },
  {
    id: 3,
    title: 'Payment Gateway Integration',
    category: 'FinTech Solutions',
    clientType: 'For BFSI & payment platforms',
    description: 'Secure payment processing handling $5M+ daily transactions',
    problemsSolved: ['Payment failures', 'Security vulnerabilities', 'Compliance gaps', 'Slow reconciliation'],
    tech: ['Spring Boot', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    details: {
      challenge: 'Building PCI-DSS compliant payment infrastructure with high availability and fraud prevention',
      solution: 'Multi-layer security architecture, real-time fraud detection, automated reconciliation system',
      impact: '99.99% transaction success rate, zero security incidents, 80% faster reconciliation',
    },
    metrics: { 'Daily Volume': '$5M+', 'Success Rate': '99.99%', 'Fraud Blocked': '$2M+', 'Compliance': 'PCI-DSS' },
    codeSnippet: `@Transactional\n@Retryable(maxAttempts = 3)\npublic PaymentResult processPayment(\n        PaymentRequest request) {\n    validateCompliance(request);\n    FraudCheck check = fraudService\n        .analyze(request);\n    return gateway.execute(request);\n}`,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
  },
]

export default function ProjectsShowcase(){
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const categories = ['All', ...new Set(projects.map(p => p.category))]
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  // Animation variants for staggered tech stack
  const techStackVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }
  
  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  }

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 200 }
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ git log --projects</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Production systems delivering <span className="text-green-400 font-bold">real business impact</span> for enterprises worldwide</p>
        <p className="text-sm text-gray-500 mt-2">Click any project to see how I solved similar challenges</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
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
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}>
              <Card className="hover:border-green-400/50 transition-all duration-500 project-card cursor-pointer group overflow-hidden h-full" onClick={() => setSelectedProject(project)}>
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <Badge className="absolute top-4 right-4">{project.category}</Badge>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <span className="text-xs text-cyan-400 bg-black/60 px-2 py-1 rounded">{project.clientType}</span>
                  </motion.div>
                </div>
                <CardHeader className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {/* Animated Tech Stack */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    variants={techStackVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <motion.div key={tech} variants={techItemVariants}>
                        <Badge 
                          variant="outline" 
                          className={`text-xs transition-all duration-300 ${techColors[tech] || 'border-gray-600 text-gray-300'} ${hoveredTech === tech ? 'scale-110 shadow-lg' : ''}`}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                    {project.tech.length > 4 && (
                      <motion.div variants={techItemVariants}>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">+{project.tech.length - 4}</Badge>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Animated Metrics */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value], i) => (
                      <motion.div 
                        key={key} 
                        className="text-center p-3 rounded bg-gray-800/50 border border-gray-700/50 group-hover:border-green-400/30 transition-colors"
                        custom={i}
                        variants={metricVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="text-green-400 font-bold text-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                        >
                          {value as string}
                        </motion.div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Client-focused CTA hint */}
                  <motion.div 
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-xs text-gray-500 group-hover:text-green-400 transition-colors">
                      Click to see how this solves your challenge →
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-black border border-green-400/50 rounded-xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto glow-border" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    {selectedProject.title}
                  </motion.h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="bg-green-600 text-black px-2 py-1 rounded text-xs font-bold">{selectedProject.category}</span>
                    <span className="text-cyan-400 text-sm">{selectedProject.clientType}</span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="border border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400 p-2 rounded-full transition-colors" 
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </motion.button>
              </div>
              
              {/* Problems Solved Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-400/20"
              >
                <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Problems This Solution Addresses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.problemsSolved.map((problem: string, i: number) => (
                    <motion.span 
                      key={problem}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700"
                    >
                      ✓ {problem}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" /> Technical Challenge
                    </h4>
                    <p className="text-gray-300">{selectedProject.details.challenge}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5" /> Solution Architecture
                    </h4>
                    <p className="text-gray-300">{selectedProject.details.solution}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Business Impact
                    </h4>
                    <p className="text-gray-300">{selectedProject.details.impact}</p>
                  </motion.div>
                  
                  {/* Animated Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedProject.metrics).map(([key, value], i) => (
                      <motion.div 
                        key={key} 
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.05, borderColor: 'rgba(34, 197, 94, 0.5)' }}
                        className="text-center p-4 rounded-lg bg-gray-800/50 border border-gray-700 cursor-default"
                      >
                        <motion.div 
                          className="text-xl md:text-2xl font-bold text-green-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                        >
                          {value as string}
                        </motion.div>
                        <div className="text-gray-400 text-xs md:text-sm">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Code Implementation</h4>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-x-auto">
                      <pre className="text-xs md:text-sm text-green-300 font-mono">{selectedProject.codeSnippet}</pre>
                    </div>
                  </motion.div>
                  
                  {/* Animated Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">Technology Stack</h4>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={techStackVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {selectedProject.tech.map((tech: string, i: number) => (
                        <motion.span 
                          key={tech}
                          variants={techItemVariants}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-default ${techColors[tech] || 'border-gray-600 text-gray-300 bg-gray-800/50'}`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* CTA Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4 space-y-3"
                  >
                    <div className="p-4 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border border-green-400/30">
                      <p className="text-sm text-gray-300 mb-3">
                        <span className="text-green-400 font-bold">Facing similar challenges?</span> Let's discuss how I can help scale your system.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-colors" 
                          href="#contact"
                          onClick={() => setSelectedProject(null)}
                        >
                          <MessageCircle className="w-4 h-4"/>
                          Discuss Your Project
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2 transition-colors" 
                          href="https://wa.me/6583985072"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Clock className="w-4 h-4"/>
                          Quick Chat
                        </motion.a>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.a 
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 border border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400 px-4 py-2 rounded-lg text-center text-sm flex items-center justify-center gap-2 transition-colors" 
                        href="#"
                      >
                        <Github className="w-4 h-4"/>View Code
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 border border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400 px-4 py-2 rounded-lg text-center text-sm flex items-center justify-center gap-2 transition-colors" 
                        href="#"
                      >
                        <ExternalLink className="w-4 h-4"/>Live Demo
                      </motion.a>
                    </div>
                  </motion.div>
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

