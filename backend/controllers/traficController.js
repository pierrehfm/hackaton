const pool = require('../db');

exports.getTraficStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT horairedeb, SUM(debithorai) AS total
      FROM comptage_trafic
      GROUP BY horairedeb
      ORDER BY horairedeb;
    `);

    res.json(result.rows); 
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getRoutesStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM infrastructure_route');


    res.json(result);
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};