const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'twitter_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'twitter_dashboard',
  password: process.env.DB_PASSWORD || 'secure_password123',
  port: process.env.DB_PORT || 5432,
});

// Test the database connection
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
