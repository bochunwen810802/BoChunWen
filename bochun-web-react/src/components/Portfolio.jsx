import React, { useState, useEffect } from 'react'
import '../styles/Portfolio.css'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all')

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

  const portfolioItems = [
    {
      id: 'smartward',
      category: 'medical',
      icon: 'fas fa-hospital',
      title: '智慧病房解決方案',
      roles: ['PM', 'SA', 'UI/UX'],
      description: '透過資料展示，搭配軟硬體整合方案，提供電子白板、護理站中控台、護理照護APP、床邊系統、數位床頭卡等多項子產品，以提高醫院護理作業效率'
    },
    {
      id: 'telemed',
      category: 'medical',
      icon: 'fas fa-stethoscope',
      title: '遠距醫療平台',
      roles: ['PM', 'SA', 'UI/UX'],
      description: '打造一個虛擬平台供醫院內部醫師可與偏鄉或隔離病房患者進行預約、看診、檢查（配合硬體儀器）等服務'
    },
    {
      id: 'envlaw',
      category: 'government',
      icon: 'fas fa-leaf',
      title: '環保法令自動化判釋系統',
      roles: ['SA', 'UI/UX'],
      description: '環境判釋法令由土壤、空氣、水質、事業廢棄物等領域組成，過去透過人工方式進行判釋暨繁複且費時，透過資訊與專業領域結合，打造自動化平台，提升民眾申請的友善管道'
    },
    {
      id: 'bike',
      category: 'iot',
      icon: 'fas fa-bicycle',
      title: '自行車揪團平台',
      roles: ['SA', 'UI/UX'],
      description: '提供自行車有揪團騎車服務，並可於騎乘期間即時分享位置，並針對騎乘速度自動判斷騎乘狀況，給予對應提醒'
    },
    {
      id: 'ai-mfg',
      category: 'manufacturing',
      icon: 'fas fa-industry',
      title: '智慧製造AI調參系統',
      roles: ['PM', 'SA'],
      description: '透過工廠過去執行數據（自動抓取），並提供可控參數選取及範圍設定，依照多種演算法模型，預測出最佳調參方式'
    },
    {
      id: 'traffic-dashboard',
      category: 'government',
      icon: 'fas fa-traffic-light',
      title: '交通即時監控儀錶板',
      roles: ['PM', 'SA', 'UI/UX'],
      description: '針對市府交通局重點區域進行關鍵交通路側設備接收整合，打造關鍵綜合儀表板，提供最有利的交通決策資訊'
    },
    {
      id: 'indoor-location',
      category: 'iot',
      icon: 'fas fa-map-marker-alt',
      title: '標籤室內定位',
      roles: ['SA', 'UI/UX'],
      description: '透過標籤定位方式，將標籤所在位置即時顯示在不同裝置上，可應用於室內或密閉空間的定位，如：工區安全及設備定位'
    },
    {
      id: 'landslide-monitor',
      category: 'iot',
      icon: 'fas fa-mountain',
      title: '崩塌監測系統',
      roles: ['PM', 'SA', 'UI/UX'],
      description: '整合雨量、水位、傾斜觀測、孔內伸縮、地表位移與即時影像等多元監測資料，透過API提供視覺化決策輔助，並於颱風、豪雨與地震期間產製即時彙整報告，支援防災決策與資安維護'
    },
    {
      id: 'talent-db',
      category: 'product',
      icon: 'fas fa-user-graduate',
      title: '學門人才資料庫與查詢系統',
      roles: ['PM', 'SA', 'UI/UX'],
      description: '開發學門人才查詢系統，協助教授快速檢索相關研究與研究者，並判斷新提交研究是否已有相似計畫執行中或曾執行過'
    }
  ]

  const filters = [
    { key: 'all', label: '全部' },
    { key: 'medical', label: '醫療' },
    { key: 'government', label: '政府' },
    { key: 'iot', label: 'IoT' },
    { key: 'manufacturing', label: '製造' },
    { key: 'product', label: '產品' }
  ]

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  const getRoleTagClass = (role) => {
    switch(role) {
      case 'PM': return 'role-tag pm'
      case 'SA': return 'role-tag sa'
      case 'UI/UX': return 'role-tag ux'
      default: return 'role-tag'
    }
  }

  return (
    <section id="portfolio">
      <h2 className="section-title fade-in">作品集</h2>
      <div className="portfolio-container">
        <div className="portfolio-filters fade-in">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-item fade-in" data-category={item.category}>
              <div className="portfolio-icon">
                <i className={item.icon}></i>
              </div>
              <div className="portfolio-content">
                <div className="portfolio-category">{filters.find(f => f.key === item.category)?.label}</div>
                <h3 className="portfolio-title">{item.title}</h3>
                <div className="role-tags">
                  {item.roles.map(role => (
                    <span key={role} className={getRoleTagClass(role)}>{role}</span>
                  ))}
                </div>
                <div className="portfolio-desc">{item.description}</div>
                <button className="portfolio-detail-btn" data-id={item.id}>查看更多</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio 