const express = require('express');
const cors = require('cors');
const { createEmailTable } = require('./models/emails');
require('dotenv').config();

const app = express();
const airRoutes = require('./routes/airRoutes');
const traficRoutes = require('./routes/traficRoutes');
const emailsRoutes = require('./routes/emailsRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', airRoutes);
app.use('/api', traficRoutes);
app.use('/api', emailsRoutes);

const PORT = process.env.PORT || 3001;
const URL_API = process.env.URL_API

createEmailTable()
  .then(() => {
    console.log('✅ Table "emails" vérifiée ou créée.');
  })
  .catch((err) => {
    console.error('❌ Erreur création table :', err);
  });

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${URL_API}:${PORT}`);
});