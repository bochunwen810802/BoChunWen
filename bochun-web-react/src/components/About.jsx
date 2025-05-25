import React, { useEffect } from 'react'
import '../styles/About.css'

const About = () => {
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
    <section id="about">
      <h2 className="section-title fade-in">關於我</h2>
      <div className="about-container about-flex-3col">
        <div className="about-image fade-in">
          <img src="/profile.jpg" alt="Bo-Chun Wen" style={{width:'100%', objectFit:'cover'}} />
        </div>
        <div className="about-content fade-in">
          <p className="about-text">我是溫柏淳，一位結合 AI、數據技術、系統分析與使用者經驗設計的產品規劃與專案管理師。</p>
          <p className="about-text">具備醫療、金融、政府、製造等多領域跨界實戰經驗，專精於將前沿技術轉化為實際可落地的產品與系統解決方案。</p>
          <p className="about-text">在專案推進中強調以敏捷思維結合Vibe Coding快速迭代，並致力於提升團隊效率、客戶滿意度與產品影響力。</p>
        </div>
        <div className="education-container fade-in about-edu-card">
          <div className="education-item">
            <div className="education-details">
              <div className="education-school">
                <i className="fas fa-university"></i>
                國立中正大學
              </div>
              <div className="education-degree">資訊管理研究所</div>
              <div className="education-period">2017 – 2019</div>
              <div className="education-more">
                <p><i className="fas fa-award"></i> GPA 4.18 / 4.3（系排名第6）</p>
                <p><i className="fas fa-file-alt"></i> 論文：結合地理資訊系統與機器學習於公共自行車租賃站缺車預測—以臺北市YouBike為例</p>
              </div>
            </div>
          </div>
          <div className="education-item">
            <div className="education-details">
              <div className="education-school">
                <i className="fas fa-university"></i>
                逢甲大學
              </div>
              <div className="education-degree">都市計畫與空間資訊學系 空間資訊組</div>
              <div className="education-period">2010 – 2014</div>
              <div className="education-more">
                <p><i className="fas fa-award"></i> Grade Point Average：3.8 / 4.0</p>
                <p><i className="fas fa-trophy"></i> 系排名：1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 