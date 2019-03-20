const pg = require('pg');
// pg.defaults.ssl = true;
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/mentorme',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },
  testing: {
    client: 'pg',
    // ssl: true,
    connection: 'postgres://localhost:5432/mentorme',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL, //the url of your db instance
      port: 5432,
      user: 'thomas_1the1_admin_pg', //master username as listed in the AWS Console,
      password: process.env.DATABASE_PW,
      database: 'mentorme', //database name
    },
    // ssl: true,
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  useNullAsDefault: true,
};
