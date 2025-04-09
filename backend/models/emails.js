// models/email.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  ssl: {
    rejectUnauthorized: false,
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
