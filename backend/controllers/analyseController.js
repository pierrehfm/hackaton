const pool = require('../db');

exports.getAnalyseStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, pollution_detectee, moyenne_journaliere
      FROM pollution_trafic_jour;
    `);

    res.json(result.rows); 
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
