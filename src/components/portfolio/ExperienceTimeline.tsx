import { motion, type Variants } from 'framer-motion'
import { Building2, MapPin, Calendar, Users, Zap, Database, Shield, type LucideIcon } from 'lucide-react'
import { portfolioContent } from '@/content/portfolio'

type Experience = {
  title: string
  company: string
  location: string
  duration: string
  type: string
  industry: string
  context: string
  achievements: { text: string; icon: LucideIcon }[]
  technologies: string[]
  evidence: Record<string, string>
  highlight: boolean
}

const experiences: Experience[] = [
  {
    title: 'Senior / Lead Java Architect',
    company: 'NTT Data / Great Eastern',
    location: 'Singapore & Malaysia',
    duration: '2022 - Present',
    type: 'Enterprise delivery',
    industry: 'BFSI / Insurance / MDM',
    context: 'Modernization work across person data, integration, runtime, and cloud-native delivery constraints.',
    achievements: [
      { text: 'Modernized a Person MDM platform from legacy EBX / JBoss / JDK 8 operations toward JDK 21 and Kubernetes delivery.', icon: Database },
      { text: 'Applied migration sequencing, dependency governance, health checks, and security quality gates to reduce release risk.', icon: Shield },
      { text: 'Used Kafka, CDC, outbox, idempotency, and saga boundaries for recoverable distributed workflows.', icon: Zap },
      { text: 'Enabled teams through architecture decisions, implementation guidance, and reviewable AI-assisted engineering practices.', icon: Users },
    ],
    technologies: ['Java 21', 'Spring Boot', 'TIBCO EBX', 'Kubernetes', 'Kafka', 'Maven', 'MS SQL'],
    evidence: { Scope: 'MDM + platform modernization', Runtime: 'JDK 21 / containers', Delivery: 'Sanitized enterprise evidence', Focus: 'Safe change' },
    highlight: true,
  },
  {
    title: 'Full-Stack Java Developer',
    company: 'ClickShip Technologies',
    location: 'Chennai, India',
    duration: '2020 - 2021',
    type: 'Product engineering',
    industry: 'Logistics / SaaS',
    context: 'Full-stack delivery for logistics workflows where API quality, integrations, and operator feedback loops matter.',
    achievements: [
      { text: 'Built and evolved Java / Spring services and REST APIs for logistics workflows.', icon: Building2 },
      { text: 'Worked across React, SQL, Docker, and CI tooling to shorten the path from change to usable product behavior.', icon: Zap },
      { text: 'Improved operational clarity by connecting application behavior with repeatable testing and deployment practices.', icon: Shield },
    ],
    technologies: ['Java', 'Spring', 'React', 'Docker', 'Jenkins', 'MySQL'],
    evidence: { Scope: 'Full-stack product delivery', Domain: 'Logistics / SaaS', Mode: 'Cross-functional', Focus: 'Reliable iteration' },
    highlight: false,
  },
  {
    title: 'Java Backend Developer',
    company: 'SysArc Infomatix',
    location: 'Chennai, India',
    duration: '2017 - 2019',
    type: 'Backend engineering',
    industry: 'Enterprise systems',
    context: 'Backend and integration foundations across inventory, payment, database, and test automation work.',
    achievements: [
      { text: 'Built enterprise Java backend features with Spring, Hibernate, Oracle, JUnit, and Maven.', icon: Building2 },
      { text: 'Worked on payment gateway integrations and the reliability boundaries around external systems.', icon: Shield },
      { text: 'Established testing and build practices that made changes easier to review and repeat.', icon: Zap },
    ],
    technologies: ['Java', 'Spring MVC', 'Hibernate', 'Oracle DB', 'JUnit', 'Maven'],
    evidence: { Scope: 'Backend + integrations', Domain: 'Enterprise systems', Foundation: 'Java / SQL', Focus: 'Maintainability' },
    highlight: false,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

export default function ExperienceTimeline() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ cat career_timeline.log</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {portfolioContent.proofPoints[0].value} years building <span className="text-green-400 font-bold">enterprise systems and delivery platforms</span>.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {['BFSI / MDM', 'Logistics / SaaS', 'Distributed systems', 'AI-augmented delivery'].map((industry, index) => (
            <motion.span key={industry} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="text-xs bg-gray-800 text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/30">
              {industry}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div className="relative" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
        <motion.div className="absolute left-8 top-0 bottom-0 w-0.5 origin-top" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ background: 'linear-gradient(to bottom, #22c55e, #3b82f6, #a855f7)' }} />

        <div className="space-y-12">
          {experiences.map((experience) => (
            <motion.div key={`${experience.company}-${experience.duration}`} variants={cardVariants} className="relative pl-20">
              <motion.div className={`absolute left-6 top-8 w-4 h-4 rounded-full ${experience.highlight ? 'bg-green-400' : 'bg-blue-400'}`} initial={{ scale: 0 }} whileInView={{ scale: 1 }} whileHover={{ scale: 1.8, boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }} transition={{ type: 'spring', stiffness: 300 }} />

              <motion.div className={`bg-black/60 border ${experience.highlight ? 'border-green-400/30' : 'border-gray-700'} hover:border-green-400/50 transition-all duration-300 rounded-xl overflow-hidden`} whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(34, 197, 94, 0.1)' }}>
                <div className="p-6 pb-4">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{experience.title}</h3>
                        {experience.highlight && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-400/50">Current context</span>}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Building2 className="w-4 h-4" />{experience.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{experience.location}</span>
                      </div>
                      <span className="inline-block text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-400/30">{experience.industry}</span>
                    </div>
                    <div className="text-left lg:text-right">
                      <span className="bg-blue-600 text-white mb-2 px-2 py-1 rounded text-xs inline-block">{experience.type}</span>
                      <div className="text-gray-400 text-sm flex items-center gap-1 lg:justify-end"><Calendar className="w-4 h-4" />{experience.duration}</div>
                    </div>
                  </div>

                  <motion.div className="mt-4 p-3 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-lg border border-green-400/20" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <p className="text-sm text-gray-300"><span className="text-green-400 font-bold">Context:</span> {experience.context}</p>
                  </motion.div>
                </div>

                <div className="p-6 pt-0 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">Evidence surfaced</h4>
                    <ul className="space-y-3">
                      {experience.achievements.map((achievement) => (
                        <motion.li key={achievement.text} className="text-gray-300 text-sm flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                          <span className="text-green-400 mt-0.5 bg-green-400/10 p-1 rounded"><achievement.icon className="w-4 h-4" /></span>
                          <span>{achievement.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(experience.evidence).map(([key, value]) => (
                      <div key={key} className="text-center p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                        <div className="text-yellow-400 font-bold text-sm md:text-base">{value}</div>
                        <div className="text-gray-500 text-xs mt-1">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">Technology context</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => <span key={technology} className="border border-gray-600 text-gray-300 bg-gray-800/30 px-3 py-1 rounded-lg text-xs">{technology}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {portfolioContent.proofPoints.map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-500 text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gray-900 rounded-lg p-4 inline-block border border-gray-700">
            <span className="text-gray-500">anup@portfolio:~$ </span>
            <span className="text-green-400">git log --oneline --author="Anup" -- public-safe</span>
            <motion.div className="text-yellow-400 mt-2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
              → Evidence indexed; confidential details stay out of the public build.
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

