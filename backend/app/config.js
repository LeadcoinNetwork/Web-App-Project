// load configuration from `.env` file
require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: 3000
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
};
