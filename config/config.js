//converted config.json to config.js so we can protect data with env variables
require(`dotenv`).config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_KEY,
    database: process.env.MYSQL_DBNAMEDEV,
    host: process.env.MYSQL_HOST,
    dialect: `mysql`
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_KEY,
    database: process.env.MYSQL_DBNAMETEST,
    host: process.env.MYSQL_HOST,
    dialect: `mysql`,

    logging: false
  },
  production: {
    'use_env_variable': "JAWSDB_URL",
    dialect: `mysql`
  }
};
