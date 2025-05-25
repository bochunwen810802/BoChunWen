const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const VISITS_FILE = path.join(__dirname, 'visits.json');

// 确保访问记录文件存在
async function ensureVisitsFile() {
  try {
    await fs.access(VISITS_FILE);
  } catch {
    await fs.writeFile(VISITS_FILE, JSON.stringify({
      total: 0,
      today: 0,
      lastReset: new Date().toISOString().split('T')[0]
    }));
  }
}

// 重置今日访问量
async function resetTodayVisits() {
  const data = JSON.parse(await fs.readFile(VISITS_FILE, 'utf8'));
  const today = new Date().toISOString().split('T')[0];
  
  if (data.lastReset !== today) {
    data.today = 0;
    data.lastReset = today;
    await fs.writeFile(VISITS_FILE, JSON.stringify(data));
  }
}

// 获取访问统计
app.get('/api/stats', async (req, res) => {
  try {
    await ensureVisitsFile();
    await resetTodayVisits();
    const data = JSON.parse(await fs.readFile(VISITS_FILE, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get visitor stats' });
  }
});

// 记录新访问
app.post('/api/visit', async (req, res) => {
  try {
    await ensureVisitsFile();
    await resetTodayVisits();
    
    const data = JSON.parse(await fs.readFile(VISITS_FILE, 'utf8'));
    data.total += 1;
    data.today += 1;
    
    await fs.writeFile(VISITS_FILE, JSON.stringify(data));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 