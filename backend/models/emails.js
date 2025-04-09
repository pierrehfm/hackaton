// models/email.js
const { Pool } = require('pg');
require('dotenv').config();  // Charger les variables d'environnement à partir du fichier .env

const pool = new Pool({
  user: process.env.PGUSER,          // Utiliser la variable d'environnement PGUSER
  host: process.env.PGHOST,          // Utiliser la variable d'environnement PGHOST
  database: process.env.PGDATABASE,  // Utiliser la variable d'environnement PGDATABASE
  password: process.env.PGPASSWORD,  // Utiliser la variable d'environnement PGPASSWORD
  port: process.env.PGPORT || 5432,  // Utiliser la variable d'environnement PGPORT, avec une valeur par défaut si non définie
  ssl: {
    rejectUnauthorized: false, // utile avec Neon et certaines plateformes
  },
});

const createEmailTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS emails (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL
    );
  `;
  await pool.query(query);
};

const saveEmail = async (email) => {
  const query = 'INSERT INTO emails (email) VALUES ($1) RETURNING *';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const getEmails = async () => {
  const query = 'SELECT * FROM emails';
  const result = await pool.query(query);
  return result.rows;
};

module.exports = { createEmailTable, saveEmail, getEmails };
