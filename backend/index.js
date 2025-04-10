const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const airRoutes = require('./routes/airRoutes');
const traficRoutes = require('./routes/traficRoutes');
const emailsRoutes = require('./routes/emailsRoutes');
const analyseRoutes = require('./routes/analyseRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', airRoutes);
app.use('/api', traficRoutes);
app.use('/api', emailsRoutes);
app.use('/api', analyseRoutes);

const PORT = process.env.PORT || 3001;
const URL_API = process.env.URL_API

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${URL_API}:${PORT}`);
});