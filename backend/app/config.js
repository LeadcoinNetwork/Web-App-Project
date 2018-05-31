var dotenv = require("dotenv");
const url = require("url");
var utils = require("./utils");

dotenv.config();
utils.throwOnMissingEnvironmentVariables();

module.exports = {
  env: process.env.NODE_ENV,
  backend: process.env.BACKEND,
  frontend: process.env.FRONTEND,
  app: {
    port: 3000
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BACKEND + "/auth/google/callback"
    },
    linkedin: {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.BACKEND + "/auth/linkedin/callback"
    }
    // We removed facebook support for now. We me use it in the near future.
    // facebook: {
    //   clientID: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //   callbackURL: process.env.BACKEND + "/auth/facebook/callback";
    // }
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    from: process.env.MAIL_FROM,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
};
