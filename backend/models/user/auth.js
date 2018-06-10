// external modules
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// internal modules
const config = require("../../config")

const jwtOptions = {
  expiresIn: config.auth.jwt.expiresIn
}

module.exports = {
  hashPassword,
  comparePassword,
  generateJWT,
  generateToken
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

function generateJWT(user) {
  let payload = {
    id: user.id,
    email: user.email
  }

  return jwt.sign(payload, config.auth.jwt.secret, jwtOptions)
}

function generateToken() {
  return bcrypt.genSaltSync()
}
