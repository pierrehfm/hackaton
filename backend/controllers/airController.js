const pool = require('../db');

exports.getAirStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM episodes_pollution');

    const filtered = result.rows.map(item => ({
      id: item.id,
      zone: item.zone,
      date: item.date,
      polluant: item.polluant,
      etat: item.etat,
      commentaire: item.commentaire
    }));

    res.json(filtered);
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
