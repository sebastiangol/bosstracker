// node-postgres.com

const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
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
//     'postgres://twfqbvpciddusu:d8f402819ec31aa66c9b70cefeec7aff36e1f506273b5631fcc62a10da45efce@ec2-54-247-137-184.eu-west-1.compute.amazonaws.com:5432/d78798aq3uae4q',
//   ssl: { rejectUnauthorized: false }
// }
// {
//   user: 'twfqbvpciddusu',
//   host: 'ec2-54-247-137-184.eu-west-1.compute.amazonaws.com',
//   password:
//     'd8f402819ec31aa66c9b70cefeec7aff36e1f506273b5631fcc62a10da45efce',
//   database: 'd78798aq3uae4q',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false
//   }
// }
// process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// user: 'twfqbvpciddusu',
// host: 'ec2-54-247-137-184.eu-west-1.compute.amazonaws.com',
// password: 'd8f402819ec31aa66c9b70cefeec7aff36e1f506273b5631fcc62a10da45efce',
// database: 'd78798aq3uae4q',
// port: 5432,
// ssl: {
// rejectUnauthorized: false,
// }

module.exports = {
  query: (text, params) => pool.query(text, params)
};
