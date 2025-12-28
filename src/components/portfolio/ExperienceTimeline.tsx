import { motion } from 'framer-motion'
import { Building2, MapPin, Calendar, TrendingUp, Users, DollarSign, Zap } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Java Architect',
    company: 'NTT Data / Great Eastern',
    location: 'Singapore & Malaysia',
    duration: '2022 - Present',
    type: 'Full-time',
    industry: 'BFSI / Insurance',
    clientOutcome: 'Enterprise-scale insurance platform serving millions of policyholders',
    achievements: [
      { text: 'Migrated monolith to microservices → 99.9% uptime, 65% performance boost', icon: TrendingUp },
      { text: 'Built CI/CD pipelines → Reduced deployment time from days to 20 minutes', icon: Zap },
      { text: 'Led architecture for systems processing 500K+ daily transactions', icon: Building2 },
      { text: 'Mentored 12-dev team on Spring Boot & cloud-native patterns', icon: Users },
    ],
    technologies: ['Java 21', 'Spring Boot', 'Kubernetes', 'AWS', 'Kafka', 'Oracle'],
    metrics: { 'System Uptime': '99.9%', 'Perf. Boost': '+65%', 'Team Led': '12 devs', 'Cost Saved': '$2M+' },
    highlight: true,
  },
  {
    title: 'Full-Stack Java Developer',
    company: 'ClickShip Technologies',
    location: 'Chennai, India',
    duration: '2020 - 2021',
    type: 'Full-time',
    industry: 'Logistics / SaaS',
    clientOutcome: 'Real-time shipping platform for 50K+ concurrent users',
    achievements: [
      { text: 'Built REST APIs handling 50K+ concurrent users → Zero downtime', icon: Users },
      { text: 'Real-time WebSocket notifications → 95% user engagement increase', icon: Zap },
      { text: 'Database optimization → 70% faster response times', icon: TrendingUp },
      { text: 'Achieved 95% test coverage → 85% reduction in production bugs', icon: Building2 },
    ],
    technologies: ['Java 8', 'Spring', 'React', 'Docker', 'Jenkins', 'MySQL'],
    metrics: { 'API Endpoints': '150+', 'Test Coverage': '95%', 'Latency Cut': '-70%', 'Bugs Down': '-85%' },
    highlight: false,
  },
  {
    title: 'Java Backend Developer',
    company: 'SysArc Infomatix',
    location: 'Chennai, India',
    duration: '2017 - 2019',
    type: 'Full-time',
    industry: 'Enterprise / Fortune 500',
    clientOutcome: 'Inventory management system for Fortune 500 retail client',
    achievements: [
      { text: 'Built inventory system managing 50M+ records for Fortune 500 client', icon: Building2 },
      { text: 'Automated testing framework → 60% faster QA cycles', icon: Zap },
      { text: 'Payment gateway integrations → Enabled $10M+ monthly transactions', icon: DollarSign },
      { text: 'Delivered 5/5 client satisfaction rating across all projects', icon: TrendingUp },
    ],
    technologies: ['Java 8', 'Spring MVC', 'Hibernate', 'Oracle DB', 'JUnit', 'Maven'],
    metrics: { 'Users': '10K+', 'Records': '50M+', 'Coverage': '90%', 'Rating': '5/5 ⭐' },
    highlight: false,
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
}

const metricVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 200 }
  })
}

const techVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 }
  })
}

export default function ExperienceTimeline(){
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ cat career_timeline.log</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          8+ years delivering <span className="text-green-400 font-bold">measurable business impact</span> for enterprises
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {['BFSI', 'E-Commerce', 'Logistics', 'Fortune 500'].map((industry, i) => (
            <motion.span 
              key={industry}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs bg-gray-800 text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/30"
            >
              {industry}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Animated Timeline Line */}
        <motion.div 
          className="absolute left-8 top-0 bottom-0 w-0.5 origin-top"
          initial={{ scaleY: 0, background: 'linear-gradient(to bottom, #22c55e, #3b82f6, #a855f7)' }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ background: 'linear-gradient(to bottom, #22c55e, #3b82f6, #a855f7)' }}
        />
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="relative pl-20"
            >
              {/* Timeline Node */}
              <motion.div 
                className={`absolute left-6 top-8 w-4 h-4 rounded-full ${exp.highlight ? 'bg-green-400' : 'bg-blue-400'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.8, boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              
              <motion.div 
                className={`bg-black/60 border ${exp.highlight ? 'border-green-400/30' : 'border-gray-700'} hover:border-green-400/50 transition-all duration-300 rounded-xl overflow-hidden`}
                whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(34, 197, 94, 0.1)' }}
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{exp.title}</h3>
                        {exp.highlight && (
                          <motion.span 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-400/50"
                          >
                            Current
                          </motion.span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Building2 className="w-4 h-4" />{exp.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{exp.location}</span>
                      </div>
                      <span className="inline-block text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-400/30">
                        {exp.industry}
                      </span>
                    </div>
                    <div className="text-left lg:text-right">
                      <span className="bg-blue-600 text-white mb-2 px-2 py-1 rounded text-xs inline-block">{exp.type}</span>
                      <div className="text-gray-400 text-sm flex items-center gap-1 lg:justify-end">
                        <Calendar className="w-4 h-4" />{exp.duration}
                      </div>
                    </div>
                  </div>
                  
                  {/* Client Outcome Banner */}
                  <motion.div 
                    className="mt-4 p-3 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-lg border border-green-400/20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm text-gray-300">
                      <span className="text-green-400 font-bold">Client Outcome:</span> {exp.clientOutcome}
                    </p>
                  </motion.div>
                </div>
                
                <div className="p-6 pt-0 space-y-6">
                  {/* Achievements with Icons */}
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">Key Achievements</h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i} 
                          className="text-gray-300 text-sm flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-green-400 mt-0.5 bg-green-400/10 p-1 rounded">
                            <achievement.icon className="w-4 h-4" />
                          </span>
                          <span>{achievement.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Animated Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(exp.metrics).map(([key, value], i) => (
                      <motion.div 
                        key={key} 
                        custom={i}
                        variants={metricVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{ scale: 1.05, borderColor: 'rgba(234, 179, 8, 0.5)' }}
                        className="text-center p-3 rounded-lg bg-gray-800/50 border border-gray-700 cursor-default"
                      >
                        <motion.div 
                          className="text-yellow-400 font-bold text-lg"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          {value as string}
                        </motion.div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Animated Tech Stack */}
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span 
                          key={tech}
                          custom={i}
                          variants={techVariants}
                          initial="hidden"
                          whileInView="visible"
                          whileHover={{ scale: 1.1, y: -2, borderColor: '#3b82f6' }}
                          className="border border-gray-600 text-gray-300 bg-gray-800/30 px-3 py-1 rounded-lg text-xs cursor-default transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5 }} 
        className="mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Years Experience', value: '8+', color: 'text-green-400' },
            { label: 'Projects Delivered', value: '50+', color: 'text-blue-400' },
            { label: 'Lines of Code', value: '1M+', color: 'text-purple-400' },
            { label: 'Client Satisfaction', value: '100%', color: 'text-yellow-400' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700"
            >
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-gray-900 rounded-lg p-4 inline-block border border-gray-700">
            <span className="text-gray-500">anup@portfolio:~$ </span>
            <span className="text-green-400">git log --oneline --author="Anup" | wc -l</span>
            <motion.div 
              className="text-yellow-400 mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              → 3,247 commits and pushing code daily 🚀
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

