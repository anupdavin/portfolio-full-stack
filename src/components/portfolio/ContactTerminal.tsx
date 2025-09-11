import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const contactCommands = [
  'anup@portfolio:~$ contact --info',
  '> Email: davinanup@gmail.com',
  '> Phone: +65 8398 5072 / +91 95004 99143',
  '> Location: Singapore / India',
  '> LinkedIn: linkedin.com/in/anup-davin-mathivanan',
  '',
  'anup@portfolio:~$ availability --status',
  '> Status: Open to new opportunities',
  '> Preferred: Senior/Lead Java & DevOps roles',
  '> Remote: Available',
  '> Start Date: 2-4 weeks',
  '',
  'anup@portfolio:~$ skills --primary',
  '> Java, Spring Boot, Microservices',
  '> AWS, Docker, Kubernetes, CI/CD',
  '> Oracle, MySQL, Redis',
  '> React, Angular, REST APIs',
  '',
  'anup@portfolio:~$ _',
]

export default function ContactTerminal(){
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [isTyping] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (currentLine < contactCommands.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, contactCommands[currentLine]])
        setCurrentLine(prev => prev + 1)
      }, currentLine === 0 ? 1000 : 300)
      return () => clearTimeout(timer)
    }
  }, [currentLine, isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent! I'll get back to you soon.")
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">$ ./contact_me.sh</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Ready to collaborate on your next enterprise Java project</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="code-block glow-border h-full rounded">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">anup@contact-terminal</span>
                <span className="text-gray-500">~</span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-1 text-sm">
                {displayedLines.map((line, index) => (
                  <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${line.startsWith('>') ? 'text-yellow-400 ml-4' : line.startsWith('anup@') ? 'text-green-400' : line === '' ? 'h-2' : 'text-gray-300 ml-4'}`}>{line}</motion.div>
                ))}
                {isTyping && currentLine >= contactCommands.length && (
                  <div className="text-green-400 terminal-cursor">anup@portfolio:~$ echo "Let's build something amazing together!"</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="code-block glow-border rounded">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">Send Message</h3>
              <p className="text-gray-400">Let's discuss your next project</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-green-400 text-sm">$ echo "Your Name"</label>
                  <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded focus:border-green-400 outline-none" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-green-400 text-sm">$ echo "Your Email"</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded focus:border-green-400 outline-none" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-green-400 text-sm">$ cat message.txt</label>
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded focus:border-green-400 outline-none h-32" placeholder="Hi Anup, let's discuss a Java opportunity..." />
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-black font-bold text-lg py-3 glow-border rounded">./send_message.sh</button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'LinkedIn', handle: '/anup-davin-mathivanan', color: 'text-blue-400' },
              { label: 'Email', handle: 'davinanup@gmail.com', color: 'text-green-400' },
              { label: 'Phone', handle: '+65 8398 5072', color: 'text-purple-400' },
              { label: 'Phone', handle: '+91 95004 99143', color: 'text-purple-400' },
            ].map(contact => (
              <motion.div key={contact.label + contact.handle} whileHover={{ scale: 1.05 }} className={`p-4 rounded border border-gray-700 bg-black/40 hover:border-green-400/50 transition-all duration-300 cursor-pointer ${contact.color}`}>
                <div className="text-sm font-bold">{contact.label}</div>
                <div className="text-xs text-gray-500">{contact.handle}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 text-center">
        <div className="code-block rounded-lg p-6 inline-block glow-border">
          <div className="text-green-400 text-lg mb-2">System.out.println("Thanks for visiting my portfolio!");</div>
          <div className="text-gray-400 text-sm">// Ready to architect your next big idea? Let's connect! 🚀</div>
        </div>
      </motion.div>
    </div>
  )
}

