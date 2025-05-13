// 存储访问数据的数组
let visitData = [];

// 初始化图表
let visitsChart;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从GitHub加载数据
    loadData();
    // 初始化图表
    initChart();
    // 更新UI
    updateUI();
});

// 从GitHub加载数据
async function loadData() {
    try {
        const response = await fetch(`https://api.github.com/repos/${config.REPO_OWNER}/${config.REPO_NAME}/contents/${config.FILE_PATH}`, {
            headers: {
                'Authorization': `token ${config.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const content = atob(data.content);
            visitData = JSON.parse(content);
        }
    } catch (error) {
        console.error('加载数据失败:', error);
        visitData = [];
    }
}

// 保存数据到GitHub
async function saveData() {
    try {
        // 首先获取文件的SHA
        const getResponse = await fetch(`https://api.github.com/repos/${config.REPO_OWNER}/${config.REPO_NAME}/contents/${config.FILE_PATH}`, {
            headers: {
                'Authorization': `token ${config.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const fileData = await getResponse.json();
        const sha = fileData.sha;
        
        // 更新文件
        const content = btoa(JSON.stringify(visitData, null, 2));
        const response = await fetch(`https://api.github.com/repos/${config.REPO_OWNER}/${config.REPO_NAME}/contents/${config.FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update visits data',
                content: content,
                sha: sha
            })
        });
        
        if (!response.ok) {
            throw new Error('保存数据失败');
        }
    } catch (error) {
        console.error('保存数据失败:', error);
    }
}

// 记录新的访问
async function recordVisit(ip, referrer) {
    const visit = {
        timestamp: new Date().toISOString(),
        ip: ip,
        duration: 0,
        referrer: referrer || '直接访问'
    };
    visitData.push(visit);
    await saveData();
    updateUI();
}

// 更新访问时长
async function updateDuration(ip) {
    const visit = visitData.find(v => v.ip === ip && !v.duration);
    if (visit) {
        const startTime = new Date(visit.timestamp);
        const endTime = new Date();
        visit.duration = Math.round((endTime - startTime) / 1000 / 60); // 转换为分钟
        await saveData();
        updateUI();
    }
}

// 初始化图表
function initChart() {
    const ctx = document.getElementById('visitsChart').getContext('2d');
    visitsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '访问量',
                data: [],
                borderColor: '#2196F3',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 更新图表
function updateChart() {
    // 获取最近7天的数据
    const last7Days = Array.from({length: 7}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    }).reverse();

    const visitsByDay = last7Days.map(date => {
        return visitData.filter(visit => 
            visit.timestamp.startsWith(date)
        ).length;
    });

    visitsChart.data.labels = last7Days;
    visitsChart.data.datasets[0].data = visitsByDay;
    visitsChart.update();
}

// 更新UI显示
function updateUI() {
    // 更新统计数据
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = visitData.filter(visit => 
        visit.timestamp.startsWith(today)
    ).length;
    
    const uniqueIPs = new Set(visitData.map(visit => visit.ip)).size;
    
    const avgDuration = visitData.length > 0 
        ? Math.round(visitData.reduce((sum, visit) => sum + (visit.duration || 0), 0) / visitData.length)
        : 0;

    document.getElementById('todayVisits').textContent = todayVisits;
    document.getElementById('totalVisits').textContent = visitData.length;
    document.getElementById('avgDuration').textContent = avgDuration + '分钟';
    document.getElementById('uniqueVisitors').textContent = uniqueIPs;

    // 更新表格
    const tableBody = document.getElementById('visitorsTableBody');
    tableBody.innerHTML = '';
    
    visitData.slice().reverse().forEach(visit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(visit.timestamp).toLocaleString()}</td>
            <td>${visit.ip}</td>
            <td>${visit.duration ? visit.duration + '分钟' : '访问中'}</td>
            <td>${visit.referrer}</td>
        `;
        tableBody.appendChild(row);
    });

    // 更新图表
    updateChart();
}

// 刷新数据
function refreshData() {
    loadData();
    updateUI();
}

// 导出函数供其他页面使用
window.analytics = {
    recordVisit,
    updateDuration
}; 