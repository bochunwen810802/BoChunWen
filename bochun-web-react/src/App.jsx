import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import FeaturedProjects from './components/FeaturedProjects'
import Contact from './components/Contact'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载过程
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <FeaturedProjects />
        <Contact />
      </main>
    </div>
  )
}

export default App 