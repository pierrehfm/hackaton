// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Bonjour depuis le backend !');
});

app.listen(3001, () => {
  console.log('Backend en écoute sur http://localhost:3001');
});