import React, { useEffect } from 'react'
import '../styles/Experience.css'

const Experience = () => {
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

  const experiences = [
    {
      period: "2022/7 – 至今",
      company: "國泰金融控股股份有限公司",
      position: "數據技術專案管理師",
      responsibilities: [
        "主導AWS平台MLOps運行專案",
        "建置GCP數據平台（資料市集、視覺化、模型訓練）",
        "推動GenAI應用於風控系統開發",
        "擔任AI團隊專案經理，推動敏捷學習與交付"
      ]
    },
    {
      period: "2020/03 – 2022/06",
      company: "研華智醫股份有限公司",
      position: "專案經理",
      responsibilities: [
        "負責智慧醫療相關產品功能規劃與介面設計，如：智慧病房及遠距醫療等產品方案；同時依據客戶需求整理對應解題條件。",
        "專案實際需求條件，亦負責資料庫需求訪談、流程設計、議會與關鍵功能設計。",
        "協同開發團隊如期如質地完成專案。目前已完成超過百台台灣醫療中心等級之智慧病房方案導入。"
      ]
    },
    {
      period: "2019/07 – 2020/02",
      company: "緯創軟體股份有限公司 (外派友達光電)",
      position: "高級工程師",
      responsibilities: [
        "協助客戶端(友達光電)資訊部門執行軟體專案，主要職務內容包含：需求分析、UI/UX系統雛型介面規劃、各廠區系統教育訓練、系統使用者溝通與處理、與內部專案團隊討論系統調整需求等。"
      ]
    },
    {
      period: "2019/05 – 2019/07",
      company: "個人外包接案",
      position: "系統分析師／專案管理師",
      responsibilities: [
        "負責協助工程營造單位及估價師事務所進行系統開發，從需求訪談、系統流程、資料庫設計到雛形設計，依照客戶需求進行規劃，再交由配合的資深工程師進行開發，屬民間單位資訊系統開發合作專案。"
      ]
    },
    {
      period: "2015/01 – 2019/04",
      company: "逢甲大學地理資訊系統研究中心",
      position: "資深規劃師",
      responsibilities: [
        "早期擔任專案規劃師，主要工作為各政府準備專案階段性簡報、資訊文件等，同時於專案開發階段，負責訪談客戶需求、撰寫系統分析文件(含介面雛形規劃)、資訊流程規劃到資料庫設計提供工程師作為開發依據。",
        "後期則擔任專案經理一職，負責帶領團隊執行軟體開發，專案種類包含多個政府單位及學術單位等。"
      ]
    }
  ]

  return (
    <section id="experience">
      <h2 className="section-title fade-in">工作經驗</h2>
      <div className="timeline-container fade-in">
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">{exp.period}</div>
              <div className="timeline-content">
                <div className="company">{exp.company}</div>
                <div className="position">{exp.position}</div>
                <ul>
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 