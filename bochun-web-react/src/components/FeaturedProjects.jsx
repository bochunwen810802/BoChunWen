import React, { useState, useEffect } from 'react'
import '../styles/FeaturedProjects.css'

const FeaturedProjects = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

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

  const projects = [
    {
      id: 'traffic-ai',
      icon: 'fas fa-car-crash',
      badge: '交通部公路局傑出獎',
      title: '交通部公路局第一屆資料創新應用競賽 - AI即時路況解碼與智慧緩解時間預測系統',
      meta: [
        { icon: 'fas fa-trophy', text: '傑出獎（第二名）' },
        { icon: 'fas fa-users', text: '125組團隊中脫穎而出' },
        { icon: 'fas fa-calendar', text: '2025年4月26日' }
      ],
      description: '交通部公路局為打造以人為本的用路環境，進一步透過公民參與及公私協力，帶動公路局服務變革加速數位轉型，提供民眾更優質的用路體驗及便民簡政服務，以「公路新思維，數據創未來」為發想主軸，辦理第一屆資料創新應用競賽。本次競賽總獎金高達新臺幣50萬元，吸引125組團隊、共計467位參賽者角逐，最後由「Geo-AI路徑好空氣」團隊及「國立臺灣師範大學」團隊脫穎而出，分別奪得社會組及學生組冠軍。',
      techHighlights: [
        'LLM自然語言解析事故資料',
        'LSTM、XGBoost預測事故處理時間',
        'RAG智能問答系統建置'
      ],
      impact: [
        '提升交通管理即時應變效率',
        '增進駕駛者安全與資訊透明',
        '開創通報資料決策支援新模式'
      ],
      links: [
        { url: 'https://bochunwen810802.github.io/114_Road/', text: '事故即時狀態儀表板MVP' },
        { url: 'https://www.cna.com.tw/postwrite/chi/400151', text: '新聞稿連結' }
      ]
    },
    {
      id: 'highway-ai',
      icon: 'fas fa-road',
      badge: '高速公路局優勝',
      title: '113 年國道智慧交通管理創意競賽 - 國道智慧交通管理與壅塞預測系統',
      meta: [
        { icon: 'fas fa-trophy', text: '優勝獎（第二名）' },
        { icon: 'fas fa-chart-line', text: '精準預測流量與壅塞' }
      ],
      description: '建立國道交通流量預測系統，整合多源數據進行壅塞預警，提供替代路線推薦。',
      techHighlights: [
        'STGCN、LSTM預測交通流量與壅塞',
        'LightGBM事故排解時間預測',
        '整合事故、施工、氣象資料，提供替代路線建議'
      ],
      impact: [
        '優化國道資源調度',
        '提升駕駛者行車體驗與決策效率'
      ],
      links: []
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="featured-projects">
      <h2 className="section-title fade-in">競賽獲獎</h2>
      <div className="projects-carousel fade-in">
        <div className="carousel-container">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="project-card">
                <div className="project-banner">
                  <i className={`${project.icon} project-icon`}></i>
                  <div className="award-badge">{project.badge}</div>
                </div>
                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    {project.meta.map((item, metaIndex) => (
                      <div key={metaIndex} className="meta-item">
                        <i className={item.icon}></i>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="project-description">{project.description}</div>
                  <div className="tech-highlights">
                    <h4 className="tech-title">技術亮點：</h4>
                    <ul className="tech-list">
                      {project.techHighlights.map((tech, techIndex) => (
                        <li key={techIndex}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-impact">
                    <h4 className="tech-title">專案影響：</h4>
                    <ul className="tech-list">
                      {project.impact.map((impact, impactIndex) => (
                        <li key={impactIndex}>{impact}</li>
                      ))}
                    </ul>
                  </div>
                  {project.links.length > 0 && (
                    <div className="project-links">
                      {project.links.map((link, linkIndex) => (
                        <a key={linkIndex} href={link.url} className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-link"></i>
                          <span>{link.text}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
        
        <button className="carousel-btn prev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  )
}

export default FeaturedProjects 