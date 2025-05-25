import React, { useEffect, useRef } from 'react'
import '../styles/Hero.css'

const Hero = () => {
  const yearsCounterRef = useRef(null)
  const projectsCounterRef = useRef(null)
  const awardsCounterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero">
      <div className="hero-content">
        <div className="tag fade-in">AI & Data Specialist</div>
        <h1 className="fade-in">嗨，我是 <span>溫柏淳</span></h1>
        <div className="subtitle fade-in">AI & Data Product Strategist / Project Manager</div>
        <p className="hero-desc fade-in">
          結合AI技術、數據分析、系統分析與UX設計，打造高效能的智慧化解決方案。
          超過8年專案管理與產品設計經驗，具備敏捷推進、跨域溝通、快速原型開發與數據應用落地能力。
        </p>
        
        <div className="tags fade-in">
          <span className="hashtag">#AI</span>
          <span className="hashtag">#Data</span>
          <span className="hashtag">#SystemAnalysis</span>
          <span className="hashtag">#UXDesign</span>
          <span className="hashtag">#ProjectManagement</span>
          <span className="hashtag">#VibeCoding</span>
        </div>
        
        <div className="stats-container fade-in">
          <div className="stat-item">
            <div className="stat-number" ref={yearsCounterRef}>8+</div>
            <div className="stat-label">年專案經驗</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" ref={projectsCounterRef}>30+</div>
            <div className="stat-label">專案完成</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" ref={awardsCounterRef}>2</div>
            <div className="stat-label">競賽獲獎</div>
          </div>
        </div>
        
        <a href="#contact" className="cta-button fade-in">與我聯繫</a>
      </div>
    </section>
  )
}

export default Hero 