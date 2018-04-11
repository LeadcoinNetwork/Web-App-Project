// load configuration from `.env` file
require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  baseURI: "/api/v1",
  app: {
    port: 3000
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
};
