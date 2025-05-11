const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

const config = {
  connectionString: process.env.DATABASE_URL,
  max: 2, 
};

const pool = new Pool(config);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database:', res.rows[0]);
  }
});

module.exports = pool;