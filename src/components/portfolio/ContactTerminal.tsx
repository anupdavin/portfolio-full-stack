import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, MessageCircle, Calendar, Clock, CheckCircle, Zap, Globe } from 'lucide-react'
import { portfolioContent } from '@/content/portfolio'

const contactCommands = [
  'anup@portfolio:~$ contact --info',
  `> Email: ${portfolioContent.contact.email}`,
  `> Phone: ${portfolioContent.contact.singaporePhone} / ${portfolioContent.contact.indiaPhone}`,
  `> Location: ${portfolioContent.identity.location}`,
  '> LinkedIn: linkedin.com/in/anup-davin-mathivanan',
  '',
  'anup@portfolio:~$ availability --status',
  `> Status: ✅ ${portfolioContent.identity.availability}`,
  '> Remote: Singapore / India • remote-ready',
  '> Working style: Async-friendly with deliberate review points',
  '',
  'anup@portfolio:~$ engagement --models',
  '> Principal / staff roles: Platform, AI, data, and architecture',
  '> Advisory: Architecture, modernization, and AI delivery controls',
  '> Collaboration: Scope the outcome before choosing the engagement shape',
  '',
  'anup@portfolio:~$ _',
]

export default function ContactTerminal(){
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', projectType: '', message: '' })
  const [isPreparing, setIsPreparing] = useState(false)
  const [handoffMessage, setHandoffMessage] = useState('')

  useEffect(() => {
    if (currentLine < contactCommands.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, contactCommands[currentLine]])
        setCurrentLine(prev => prev + 1)
      }, currentLine === 0 ? 800 : 200)
      return () => clearTimeout(timer)
    }
  }, [currentLine, isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPreparing(true)
    setHandoffMessage('')
    const subject = formData.projectType ? `Portfolio inquiry: ${formData.projectType}` : 'Portfolio inquiry'
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company || 'Not provided'}`,
      `Project type: ${formData.projectType || 'Not specified'}`,
      '',
      formData.message,
    ].join('\n')
    window.location.href = `mailto:${portfolioContent.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setTimeout(() => {
      setIsPreparing(false)
      setHandoffMessage('Your email client should now have a draft ready. This page does not claim delivery.')
    }, 400)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ ./contact_me.sh</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Ready to <span className="text-green-400 font-bold">modernize a platform</span> or introduce AI with the right guardrails?
        </p>
        
        {/* Quick Stats */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Clock, text: 'Async-friendly', color: 'text-green-400' },
            { icon: Globe, text: 'Remote-ready', color: 'text-blue-400' },
            { icon: CheckCircle, text: 'Evidence-led', color: 'text-yellow-400' },
          ].map((item, i) => (
            <motion.div 
              key={item.text}
              className={`flex items-center gap-2 ${item.color} text-sm`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.a 
          href="https://wa.me/6583985072?text=Hi%20Anup,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold px-6 py-3 rounded-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp (Fastest)
        </motion.a>
        <motion.a 
          href={`mailto:${portfolioContent.contact.email}?subject=Architecture%20conversation%20request`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black font-bold px-6 py-3 rounded-lg transition-colors"
        >
          <Calendar className="w-5 h-5" />
          Request a Call
        </motion.a>
        <motion.a 
          href="mailto:davinanup@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-bold px-6 py-3 rounded-lg transition-colors"
        >
          <Mail className="w-5 h-5" />
          Send Email
        </motion.a>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="bg-gray-900/80 border border-gray-700 rounded-xl overflow-hidden h-full">
            <div className="p-4 border-b border-gray-700 flex items-center gap-2">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <span className="text-green-400 font-mono text-sm ml-2">anup@contact-terminal</span>
            </div>
            <div className="p-6 font-mono">
              <div className="space-y-1 text-sm">
                {displayedLines.map((line, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${
                      line.startsWith('>') 
                        ? line.includes('✅') ? 'text-green-400 ml-4' : 'text-yellow-400 ml-4'
                        : line.startsWith('anup@') 
                          ? 'text-green-400' 
                          : line === '' 
                            ? 'h-3' 
                            : 'text-gray-300 ml-4'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
                {isTyping && currentLine >= contactCommands.length && (
                  <motion.div 
                    className="text-green-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    anup@portfolio:~$ echo "Let's build something amazing together!" █
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="bg-gray-900/80 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Start a Conversation
              </h3>
          <p className="text-gray-400 mt-1">Tell me about the outcome you need. This form prepares an email draft on your device.</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-green-400 text-sm font-mono">$ name</label>
                    <input 
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })} 
                      className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none transition-colors" 
                      placeholder="Your name"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-green-400 text-sm font-mono">$ company</label>
                    <input 
                      value={formData.company} 
                      onChange={e => setFormData({ ...formData, company: e.target.value })} 
                      className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none transition-colors" 
                      placeholder="Company (optional)" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-green-400 text-sm font-mono">$ email</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none transition-colors" 
                    placeholder="you@company.com"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-green-400 text-sm font-mono">$ project_type</label>
                  <select 
                    value={formData.projectType}
                    onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none transition-colors"
                  >
                    <option value="">Select project type...</option>
                    <option value="new-backend">New Backend System</option>
                    <option value="microservices">Microservices Migration</option>
                    <option value="optimization">Performance Optimization</option>
                    <option value="consulting">Architecture Consulting</option>
                    <option value="devops">DevOps / Cloud Setup</option>
                    <option value="fulltime">Full-time Role</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-green-400 text-sm font-mono">$ message</label>
                  <textarea 
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                    className="w-full bg-black border border-gray-600 text-white px-4 py-2.5 rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none h-28 transition-colors resize-none" 
                    placeholder="Tell me about your project, timeline, and any specific challenges you're facing..."
                    required
                  />
                </div>
                <motion.button 
                  type="submit" 
                  disabled={isPreparing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-black font-bold text-lg py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isPreparing ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⏳</motion.span>
                      Opening email draft...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Open Email Draft
                    </>
                  )}
                </motion.button>
                {handoffMessage && <p className="text-sm text-cyan-300 border border-cyan-400/20 bg-cyan-400/5 rounded-lg p-3">{handoffMessage}</p>}
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Cards */}
      <motion.div 
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { icon: Linkedin, label: 'LinkedIn', handle: 'anup-davin-mathivanan', href: portfolioContent.contact.linkedin, color: 'hover:border-blue-400 hover:text-blue-400' },
          { icon: Mail, label: 'Email', handle: portfolioContent.contact.email, href: `mailto:${portfolioContent.contact.email}`, color: 'hover:border-green-400 hover:text-green-400' },
          { icon: Phone, label: 'Singapore', handle: portfolioContent.contact.singaporePhone, href: 'tel:+6583985072', color: 'hover:border-purple-400 hover:text-purple-400' },
          { icon: Phone, label: 'India', handle: portfolioContent.contact.indiaPhone, href: 'tel:+919500499143', color: 'hover:border-cyan-400 hover:text-cyan-400' },
        ].map((contact, i) => (
          <motion.a 
            key={contact.handle}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`p-4 rounded-xl border border-gray-700 bg-black/40 transition-all duration-300 ${contact.color}`}
          >
            <contact.icon className="w-5 h-5 mb-2" />
            <div className="text-sm font-bold text-white">{contact.label}</div>
            <div className="text-xs text-gray-500 truncate">{contact.handle}</div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer CTA */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ delay: 0.8 }} 
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-green-900/20 via-gray-900 to-blue-900/20 rounded-xl p-8 border border-gray-700">
          <motion.div 
            className="text-green-400 text-lg mb-4 font-mono"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            System.out.println("Thanks for visiting my portfolio!");
          </motion.div>
          <p className="text-gray-300 mb-6">
            Whether you need to <span className="text-green-400">modernize a platform</span>,
            <span className="text-blue-400"> make data more trustworthy</span>, or
            <span className="text-purple-400"> introduce AI with guardrails</span>—let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href={portfolioContent.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-green-400 border border-green-400/50 px-4 py-2 rounded-lg hover:bg-green-400/10 transition-colors text-sm"
            >
              💬 Quick Chat on WhatsApp
            </motion.a>
            <motion.a 
              href="#hero"
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 border border-gray-600 px-4 py-2 rounded-lg hover:border-gray-500 transition-colors text-sm"
            >
              ↑ Back to Top
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
