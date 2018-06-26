// external modules
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function hashPassword(password): string {
  return bcrypt.hashSync(password, 10)
}

function comparePassword(password, hash): boolean {
  return bcrypt.compareSync(password, hash)
}

/**
 * @returns Token
 */
function generateJWT(user_id: number, secret: string): string {
  let payload = {
    id: user_id,
  }
  return jwt.sign(payload, secret, { expiresIn: 3600 })
}

function generateToken() {
  return bcrypt.genSaltSync()
}

export { hashPassword, comparePassword, generateJWT, generateToken }
