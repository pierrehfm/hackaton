const pool = require('../db');

exports.getAirStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pollution_air');

    const filtered = result.rows.map(item => ({
      id: item.id,
      lib_zone: item.lib_zone,
      date_ech: item.date_ech,
      lib_pol: item.lib_pol,
      etat: item.etat,
      com_long: item.com_long
    }));

    res.json(filtered);
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getEpisodeStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM episodes_pollution ');

    res.json(result);
  } catch (err) {
    console.error('Erreur lors de la requête PostgreSQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
