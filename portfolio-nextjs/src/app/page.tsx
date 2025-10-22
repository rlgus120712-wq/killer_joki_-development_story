'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  )
}