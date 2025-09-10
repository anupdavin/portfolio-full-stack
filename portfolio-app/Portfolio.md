Pages - Folder

Portfolio - file

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Terminal, 
  Code, 
  Database, 
  Server, 
  Cloud,
  GitBranch,
  Coffee,
  Zap,
  Monitor,
  Smartphone,
  Globe,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Download
} from "lucide-react";

import TerminalHero from "../components/portfolio/TerminalHero";
import TechStack from "../components/portfolio/TechStack";
import ProjectsShowcase from "../components/portfolio/ProjectsShowcase";
import ExperienceTimeline from "../components/portfolio/ExperienceTimeline";
import ContactTerminal from "../components/portfolio/ContactTerminal";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400">
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={el => sectionRefs.current.hero = el}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <TerminalHero />
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={el => sectionRefs.current.about = el}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              $ cat about_me.txt
            </h2>
            <div className="code-block rounded-xl p-8 max-w-4xl mx-auto text-left">
              <pre className="text-lg leading-relaxed">
{`/**
 * Senior Full-Stack Java Developer
 * Specializing in Enterprise Architecture & Cloud Solutions
 */
public class Developer {
    private final String name = "Anup Davin Mathivanan";
    private final List<String> specialties = Arrays.asList(
        "Backend Architecture", "API Design", "Cloud Infrastructure",
        "Database Optimization", "CI/CD Pipelines", "Frontend Integration"
    );
}`}
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section 
        id="skills" 
        ref={el => sectionRefs.current.skills = el}
        className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <TechStack />
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={el => sectionRefs.current.projects = el}
        className="py-20 px-6"
      >
        <ProjectsShowcase />
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        ref={el => sectionRefs.current.experience = el}
        className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <ExperienceTimeline />
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={el => sectionRefs.current.contact = el}
        className="py-20 px-6"
      >
        <ContactTerminal />
      </section>
    </div>
  );
}

