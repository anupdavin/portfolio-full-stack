import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TerminalHero from '@/components/portfolio/TerminalHero'
import TechStack from '@/components/portfolio/TechStack'
import ProjectsShowcase from '@/components/portfolio/ProjectsShowcase'
import ExperienceTimeline from '@/components/portfolio/ExperienceTimeline'
import ContactTerminal from '@/components/portfolio/ContactTerminal'
import { Github, Linkedin } from 'lucide-react'

export default function Portfolio(){
  const [activeSection, setActiveSection] = useState('hero')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
    }, { threshold: 0.3, rootMargin: '-100px 0px' })
    Object.values(sectionRefs.current).forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400">
      <section id="hero" ref={(el) => { sectionRefs.current.hero = el }} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <TerminalHero />
      </section>

      <section id="about" ref={(el) => { sectionRefs.current.about = el }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ cat about_me.txt</h2>
            <div className="code-block rounded-xl p-8 max-w-4xl mx-auto text-left">
              <pre className="text-lg leading-relaxed">{`/**\n * Senior Full-Stack Java Developer\n * Specializing in Enterprise Architecture & Cloud Solutions\n */\npublic class Developer {\n    private final String name = "Anup Davin Mathivanan";\n    private final List<String> specialties = Arrays.asList(\n        "Backend Architecture", "API Design", "Cloud Infrastructure",\n        "Database Optimization", "CI/CD Pipelines", "Frontend Integration"\n    );\n}`}</pre>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" ref={(el) => { sectionRefs.current.skills = el }} className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <TechStack />
      </section>

      <section id="projects" ref={(el) => { sectionRefs.current.projects = el }} className="py-20 px-6">
        <ProjectsShowcase />
      </section>

      <section id="experience" ref={(el) => { sectionRefs.current.experience = el }} className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <ExperienceTimeline />
      </section>

      <section id="contact" ref={(el) => { sectionRefs.current.contact = el }} className="py-20 px-6">
        <ContactTerminal />
      </section>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 glow-border grid place-items-center" href="https://github.com/" target="_blank" rel="noreferrer">
            <Github className="w-5 h-5" />
          </a>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 glow-border grid place-items-center" href="https://www.linkedin.com/in/anup-davin-mathivanan" target="_blank" rel="noreferrer">
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {['hero', 'about', 'skills', 'projects', 'experience', 'contact'].map(section => (
          <div key={section} className={`w-2 h-8 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-green-400 glow-border' : 'bg-gray-600 hover:bg-gray-500'}`} />
        ))}
      </div>
    </div>
  )
}

