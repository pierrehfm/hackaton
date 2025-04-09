const express = require('express');
const router = express.Router();
const { saveEmail, getEmails } = require('../models/emails');

router.post('/emails', async (req, res) => {
  try {
    const { email } = req.body;
    const savedEmail = await saveEmail(email);
    res.status(200).json(savedEmail);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la sauvegarde de l\'email' });
  }
});

router.get('/emails', async (req, res) => {
  try {
    const emails = await getEmails();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des emails' });
  }
});

module.exports = router;
