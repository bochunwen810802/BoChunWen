import React, { useEffect } from 'react'
import '../styles/Contact.css'

const Contact = () => {
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

  const contactButtons = [
    {
      href: 'mailto:bochunwen810802@gmail.com',
      icon: 'fas fa-envelope',
      text: 'Email',
      description: 'bochunwen810802@gmail.com',
      color: '#EA4335'
    },
    {
      href: 'https://linkedin.com/in/bochunwen',
      icon: 'fab fa-linkedin',
      text: 'LinkedIn',
      description: '專業履歷',
      color: '#0077B5'
    },
    {
      href: 'https://github.com/bochunwen810802',
      icon: 'fab fa-github',
      text: 'GitHub',
      description: '程式作品',
      color: '#333'
    }
  ]

  return (
    <section id="contact">
      <h2 className="section-title fade-in">聯絡我</h2>
      <div className="contact-container fade-in">
        <p className="contact-intro">如果您對我的專業能力和專案經驗感興趣，或者想要討論相關合作機會，歡迎隨時與我聯繫！</p>
        
        <div className="contact-buttons">
          {contactButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className="contact-button"
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--button-color': button.color }}
            >
              <div className="button-icon">
                <i className={button.icon}></i>
              </div>
              <div className="button-content">
                <div className="button-title">{button.text}</div>
                <div className="button-description">{button.description}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <footer className="footer fade-in">
        <div className="footer-content">
          <p>&copy; 2024 Bo-Chun Wen. All rights reserved.</p>
          <div className="social-links">
            <a href="mailto:bochunwen810802@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://linkedin.com/in/bochunwen" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/bochunwen810802" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Contact 