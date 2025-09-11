import { useState } from 'react'
import { motion } from 'framer-motion'

const techCategories: Record<string, any> = {
  Backend: {
    color: 'text-red-400',
    icon: '🔧',
    technologies: [
      { name: 'Java', level: 95, description: 'Enterprise applications, Spring ecosystem' },
      { name: 'Spring Boot', level: 90, description: 'RESTful APIs, microservices architecture' },
      { name: 'Spring Security', level: 85, description: 'OAuth2, JWT, authentication systems' },
      { name: 'Hibernate/JPA', level: 88, description: 'ORM mapping, database optimization' },
      { name: 'Maven/Gradle', level: 82, description: 'Dependency management, build automation' },
    ],
  },
  Database: {
    color: 'text-blue-400',
    icon: '🗄️',
    technologies: [
      { name: 'Oracle', level: 88, description: 'PL/SQL, performance tuning' },
      { name: 'MySQL', level: 85, description: 'CRUD operations, stored procedures' },
      { name: 'PostgreSQL', level: 80, description: 'Advanced SQL, indexing' },
      { name: 'MongoDB', level: 78, description: 'NoSQL, document-based storage' },
      { name: 'Redis', level: 80, description: 'Caching, session management' },
    ],
  },
  'Cloud & DevOps': {
    color: 'text-purple-400',
    icon: '☁️',
    technologies: [
      { name: 'AWS', level: 88, description: 'EC2, S3, RDS, IAM' },
      { name: 'Docker', level: 85, description: 'Containerization, microservices deployment' },
      { name: 'Kubernetes', level: 75, description: 'Orchestration, scaling' },
      { name: 'Jenkins', level: 80, description: 'CI/CD pipelines' },
      { name: 'Terraform', level: 70, description: 'Infrastructure as Code' },
    ],
  },
  Frontend: {
    color: 'text-yellow-400',
    icon: '🎨',
    technologies: [
      { name: 'React', level: 85, description: 'Component architecture, state management' },
      { name: 'TypeScript', level: 80, description: 'Type safety, enterprise applications' },
      { name: 'Angular', level: 75, description: 'Enterprise frontends, RxJS' },
      { name: 'JavaScript', level: 88, description: 'ES6+, async programming' },
      { name: 'Tailwind CSS', level: 82, description: 'Responsive design, utility-first CSS' },
    ],
  },
}

export default function TechStack(){
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof techCategories>('Backend')
  const [hoveredTech, setHoveredTech] = useState<any | null>(null)

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ ls -la /skills/</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Comprehensive technology stack mastered through years of enterprise development</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.entries(techCategories).map(([category, data]) => (
          <motion.button key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(category as any)}
            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${selectedCategory === category ? 'border-green-400 bg-green-400/10 text-green-400 glow-border' : 'border-gray-600 text-gray-400 hover:border-gray-500'}`}>
            <span className="mr-2">{(data as any).icon}</span>{category}
          </motion.button>
        ))}
      </div>

      <motion.div key={selectedCategory as string} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techCategories[selectedCategory].technologies.map((tech: any, index: number) => (
          <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} onHoverStart={() => setHoveredTech(tech)} onHoverEnd={() => setHoveredTech(null)}>
            <div className="bg-black/60 border border-gray-700 hover:border-green-400/50 transition-all duration-300 project-card rounded">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                  <span className={`${techCategories[selectedCategory].color} border-current border px-2 py-1 rounded text-xs`}>{tech.level}%</span>
                </div>
                <div className="mb-4 h-2 bg-gray-800 rounded overflow-hidden"><div className="h-full bg-green-400" style={{ width: `${tech.level}%` }} /></div>
                <p className="text-gray-400 text-sm">{tech.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Proficiency:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < Math.floor(tech.level / 20) ? 'bg-green-400' : 'bg-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {hoveredTech && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-lg bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/30">
          <h4 className="text-2xl font-bold text-green-400 mb-2">{hoveredTech.name}</h4>
          <p className="text-gray-300 text-lg">{hoveredTech.description}</p>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 text-center">
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">anup@portfolio:~$ </span>
          <span className="text-green-400">grep -r "passionate developer" ./</span>
          <div className="text-yellow-400 mt-2">→ Match found: Building scalable solutions with clean, maintainable code 🚀</div>
        </div>
      </motion.div>
    </div>
  )
}

