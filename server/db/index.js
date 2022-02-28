// node-postgres.com

const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
  // ssl: {rejectUnauthorized: false}
};
const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);
// process.env.NODE_ENV === 'production' ? prodConfig : devConfig
// {
//   connectionString:
//     'postgres://___',
//   ssl: { rejectUnauthorized: false }
// }
// {

module.exports = {
  query: (text, params) => pool.query(text, params)
};
