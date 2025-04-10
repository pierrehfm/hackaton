const pool = require('../db');

exports.getAnalyseStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, zone, polluant, etat, SUM(moyennejou)
      FROM pollution_trafic_correlation
      GROUP BY date, zone, polluant, etat;
    `);

    res.json(result.rows); 
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
