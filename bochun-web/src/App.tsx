import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, Button, Container, Box, Paper } from '@mui/material';
import './i18n';

interface VisitorStats {
  total: number;
  today: number;
}

function App() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<VisitorStats>({ total: 0, today: 0 });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    // 记录访问
    fetch('http://localhost:5000/api/visit', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error recording visit:', error));

    // 获取访问统计
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('welcome')}
          </Typography>
          <Button color="inherit" onClick={() => changeLanguage('en')}>
            {t('switchToEnglish')}
          </Button>
          <Button color="inherit" onClick={() => changeLanguage('zh')}>
            {t('switchToChinese')}
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('about')}
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('contact')}
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {t('visitorStats')}
            </Typography>
            <Typography variant="h6">
              {t('totalVisitors')}: {stats.total}
            </Typography>
            <Typography variant="h6">
              {t('todayVisitors')}: {stats.today}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default App;
