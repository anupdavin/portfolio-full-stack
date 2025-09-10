import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Senior Java Architect',
    company: 'NTT Data / Great Eastern',
    location: 'Singapore & Malaysia',
    duration: '2022 - Present',
    type: 'Full-time',
    achievements: [
      'Led migration of monolith to microservices for EPAY platform',
      'Implemented DevOps practices reducing deployment time by 80%',
      'Mentored developers on Spring Boot best practices',
      'Architected systems processing 500K+ daily transactions',
    ],
    technologies: ['Java 21', 'Spring Boot', 'Kubernetes', 'AWS', 'Kafka', 'Oracle'],
    metrics: { 'System Uptime': '99.9%', 'Performance Gain': '+65%', 'Team Size': '12 devs', 'Budget Saved': '$2M+' },
  },
  {
    title: 'Full-Stack Java Developer',
    company: 'ClickShip Technologies',
    location: 'Chennai, India',
    duration: '2020 - 2021',
    type: 'Full-time',
    achievements: [
      'Built scalable REST APIs handling 50K+ concurrent users',
      'Developed real-time notification system using WebSockets',
      'Optimized database queries improving response time by 70%',
      'Increased test coverage to 95% with JUnit',
    ],
    technologies: ['Java 8', 'Spring', 'React', 'Docker', 'Jenkins', 'MySQL'],
    metrics: { 'API Endpoints': '150+', 'Code Coverage': '95%', 'Response Time': '-70%', 'Bug Reports': '-85%' },
  },
  {
    title: 'Java Backend Developer',
    company: 'SysArc Infomatix',
    location: 'Chennai, India',
    duration: '2017 - 2019',
    type: 'Full-time',
    achievements: [
      'Developed inventory management for a Fortune 500 client',
      'Built automated testing framework reducing QA time by 60%',
      'Integrated third-party APIs and payment gateways',
      'Participated in code reviews and knowledge sharing',
    ],
    technologies: ['Java 8', 'Spring MVC', 'Hibernate', 'Oracle DB', 'JUnit', 'Maven'],
    metrics: { 'System Users': '10K+', 'Data Records': '50M+', 'Test Coverage': '90%', 'Client Rating': '5/5 ⭐' },
  },
]

export default function ExperienceTimeline(){
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ cat career_timeline.log</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Professional journey through enterprise Java development and system architecture</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400"></div>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} className="relative pl-20">
              <motion.div className="absolute left-6 top-8 w-4 h-4 bg-green-400 rounded-full glow-border" whileHover={{ scale: 1.5 }} />
              <div className="bg-black/60 border border-gray-700 hover:border-green-400/50 transition-all duration-300 project-card rounded">
                <div className="p-6 pb-4">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div>{exp.company}</div>
                        <div>{exp.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-600 text-white mb-2 px-2 py-1 rounded text-xs inline-block">{exp.type}</span>
                      <div className="text-gray-400 text-sm">{exp.duration}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-green-400 mt-1">▶</span>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(exp.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 rounded bg-gray-800/50 border border-gray-700">
                        <div className="text-yellow-400 font-bold text-lg">{value as string}</div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map(tech => (<span key={tech} className="border border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors px-2 py-1 rounded text-xs">{tech}</span>))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 text-center">
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">anup@portfolio:~$ </span>
          <span className="text-green-400">git log --oneline --author="Anup" | wc -l</span>
          <div className="text-yellow-400 mt-2">→ 3,247 commits and still pushing code daily 🚀</div>
        </div>
      </motion.div>
    </div>
  )
}

