import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import TerminalHero from '@/components/portfolio/TerminalHero'
import TechStack from '@/components/portfolio/TechStack'
import ProjectsShowcase from '@/components/portfolio/ProjectsShowcase'
import AiEngineeringLab from '@/components/portfolio/AiEngineeringLab'
import ExperienceTimeline from '@/components/portfolio/ExperienceTimeline'
import ContactTerminal from '@/components/portfolio/ContactTerminal'
import { Github, Linkedin } from 'lucide-react'
import { portfolioContent } from '@/content/portfolio'

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
            <div className="code-block rounded-xl p-8 max-w-5xl mx-auto text-left">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
                <div>
                  <div className="text-green-400 text-sm mb-4">// {portfolioContent.identity.headline}</div>
                  <p className="text-gray-200 text-lg leading-relaxed mb-5">{portfolioContent.about.summary}</p>
                  <p className="text-gray-400 leading-relaxed">{portfolioContent.about.approach}</p>
                </div>
                <div className="border border-gray-700 rounded-lg p-5 bg-black/40">
                  <div className="text-blue-400 text-sm mb-4">$ cat operating_principles.md</div>
                  <ul className="space-y-4 text-sm text-gray-300">
                    {portfolioContent.about.principles.map((principle, index) => (
                      <li key={principle} className="flex gap-3">
                        <span className="text-green-400 font-mono">[{String(index + 1).padStart(2, '0')}]</span>
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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

      <section id="ai-lab" ref={(el) => { sectionRefs.current['ai-lab'] = el }} className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <AiEngineeringLab />
      </section>

      <section id="experience" ref={(el) => { sectionRefs.current.experience = el }} className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <ExperienceTimeline />
      </section>

      <section id="contact" ref={(el) => { sectionRefs.current.contact = el }} className="py-20 px-6">
        <ContactTerminal />
      </section>

      <div className="fixed bottom-24 right-8 z-50 flex flex-col gap-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 glow-border grid place-items-center" href={portfolioContent.contact.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
            <Github className="w-5 h-5" />
          </a>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 glow-border grid place-items-center" href={portfolioContent.contact.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {['hero', 'about', 'skills', 'projects', 'ai-lab', 'experience', 'contact'].map(section => (
          <div key={section} className={`w-2 h-8 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-green-400 glow-border' : 'bg-gray-600 hover:bg-gray-500'}`} />
        ))}
      </div>
    </div>
  )
}
