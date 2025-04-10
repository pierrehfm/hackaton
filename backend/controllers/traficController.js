const pool = require('../db');

exports.getTraficStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT horairedeb, SUM(debithorai) AS total
      FROM comptage_trafic
      WHERE typepostem = 'Comptage tous véhicules'
      GROUP BY horairedeb
      ORDER BY horairedeb;
    `);

    res.json(result.rows); 
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


exports.getTraficDaysStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, SUM(moyennejou) AS total
      FROM comptage_trafic
      WHERE typepostem = 'Comptage tous véhicules'
      GROUP BY date
      ORDER BY date;
    `);

    res.json(result.rows); 
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
