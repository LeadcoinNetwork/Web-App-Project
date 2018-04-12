const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config");

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  authenticate
};

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function generateToken(user) {
  let options = {
    expiresIn: config.jwtExpiresIn
  };

  let payload = {
    id: user.id,
    email: user.email
  };

  return jwt.sign(payload, config.jwtSecret, options);
}

// set default options for passport.authenticate
function authenticate(name, options, callback) {
  if (typeof options == "function") {
    callback = options;
    options = {};
  }

  options = Object.assign(
    {
      session: false,
      // failWithError is not documented (as of Apr 2018)
      // see https://github.com/passport/www.passportjs.org/pull/51
      failWithError: true
    },
    options
  );

  return passport.authenticate(name, options, callback);
}
