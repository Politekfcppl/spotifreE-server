const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/audio/:videoId', (req, res) => {
  const id = req.params.videoId;
  const cmd = `yt-dlp -f bestaudio --get-url "https://www.youtube.com/watch?v=${id}"`;
  
  exec(cmd, (error, stdout) => {
    if (error) return res.status(500).json({ error: 'Failed to get audio URL' });
    const url = stdout.trim();
    res.json({ url });
  });
});

app.get('/', (req, res) => res.send('SpotifreE server running!'));

app.listen(3000, () => console.log('Server running on port 3000'));
