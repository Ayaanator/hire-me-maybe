const express = require('express');
const app = express();

app.use(express.json());

app.post('/log', (req, res) => {
  console.log('Button clicked:', req.body.message || 'test');
  res.send('Logged');
});

app.listen(3000, () => {
  console.log('Logging server running on port 3000');
});