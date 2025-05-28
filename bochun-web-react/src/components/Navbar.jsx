import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">Bo-Chun Wen</div>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#hero">首頁</a>
        <a href="#about">關於我</a>
        <a href="#skills">技能</a>
        <a href="#experience">工作經歷</a>
        <a href="#portfolio">專案經歷</a>
        <a href="#featured-projects">競賽獲獎</a>
        <a href="#contact">聯絡我</a>
      </div>
      <div className="mobile-menu" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  )
}

export default Navbar 