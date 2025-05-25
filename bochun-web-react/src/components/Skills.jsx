import React, { useEffect, useRef } from 'react'
import '../styles/Skills.css'

const Skills = () => {
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          
          // 動畫技能進度條
          const skillBars = entry.target.querySelectorAll('.skill-progress')
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width')
            setTimeout(() => {
              bar.style.width = width
            }, 300)
          })
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      title: "專案管理與團隊溝通",
      skills: [
        { name: "專案規劃與推進", percentage: "90%" },
        { name: "跨部門協作與溝通", percentage: "95%" }
      ]
    },
    {
      title: "系統訪談與規劃分析",
      skills: [
        { name: "需求訪談與流程設計", percentage: "90%" },
        { name: "系統分析文件撰寫", percentage: "85%" }
      ]
    },
    {
      title: "產品設計與UX",
      skills: [
        { name: "UI設計與原型製作 / UX使用者體驗設計", percentage: "80%" },
        { name: "Axure RP/ Figma", percentage: "88%" }
      ]
    },
    {
      title: "簡報設計與提案",
      skills: [
        { name: "簡報架構與視覺設計", percentage: "92%" },
        { name: "提案與說服力", percentage: "88%" }
      ]
    },
    {
      title: "規格文件與資料彙整",
      skills: [
        { name: "規格文件撰寫", percentage: "83%" },
        { name: "資料彙整與分析", percentage: "89%" }
      ]
    },
    {
      title: "AI產品規劃",
      skills: [
        { name: "AI技術掌握", percentage: "75%" },
        { name: "Vibe Coding與實作", percentage: "89%" }
      ]
    }
  ]

  return (
    <section id="skills" ref={skillsRef}>
      <h2 className="section-title fade-in">技能專長</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category fade-in">
            <h3>{category.title}</h3>
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="skill-item">
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" data-width={skill.percentage}></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills 