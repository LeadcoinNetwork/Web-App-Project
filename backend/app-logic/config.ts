var dotenv = require("dotenv")
const url = require("url")
var utils = require("../utils")

dotenv.config()
utils.throwOnMissingEnvironmentVariables()

class Config {
  // FLAGS
  AUTO_CONFIRM_EMAIL = true
  SKIP_COMPLETE_PROFILE = true
  INITIAL_BALANCE = 1000

  env = process.env.NODE_ENV
  backend = process.env.BACKEND
  frontend = process.env.FRONTEND
  upload = process.env.UPLOAD_DIR
  app = {
    port: process.env.PORT,
  }
  auth = {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BACKEND + "/auth/google/callback",
    },
    linkedin: {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.BACKEND + "/auth/linkedin/callback",
    },
  }
  mail = {
    mailer: process.env.MAILER,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    from: process.env.MAIL_FROM,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
  mysql = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: "leadcoin",
    connectionLimit: process.env.CONNECTION_LIMIT || 10,
    password: process.env.MYSQL_PASSWORD,
  }
}

var config = new Config()
export { Config as IConfig }
export default config
