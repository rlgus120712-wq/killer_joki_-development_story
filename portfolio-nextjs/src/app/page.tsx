'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import TechStack from '@/components/TechStack'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TechStack />
      </main>
    </div>
  )
}