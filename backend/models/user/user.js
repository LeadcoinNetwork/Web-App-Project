//@ts-check

const auth = require("../auth/auth")
const validate = require("../validate/validate")
const TokenMySQL = require("../token-mysql/token-mysql")
const UserMySQL = require("../user-mysql/user-mysql")

class User {
  constructor({ email }) {
    this.email = email
  }

  // returns user
  async insert(user) {
    let { email } = user
    await this.uniqueEmail(email)

    user.created = Date.now()
    await UserMySQL.insert(user)
    ;[user] = await this.find({ email })
    return user
  }

  // returns [user]
  async find(condition, fields) {
    let users = await UserMySQL.find(condition, fields)
    users = users.map(user => {
      delete user.password
      return user
    })
    return users
  }

  // returns true/false
  async remove(userId) {
    return await UserMySQL.remove(userId)
  }

  async login(userId) {
    let [user] = await this.find({ id: userId })
    let token = auth.generateJWT(user)
    if (user.disabled) {
      return token
    }

    // update login timestamp
    await UserMySQL.update(user.id, { login: Date.now() })

    return token
  }

  // ----------------------------- ONLY LOCAL USERS -----------------------------

  // returns user
  async register(user) {
    var _user = await validate.newUser(user)

    let { email } = _user

    _user.password = auth.hashPassword(_user.password)
    _user.disabled = "EMAIL_NOT_VERIFIED"
    let token = auth.generateToken()

    _user = await this.insert(_user)

    await TokenMySQL.insert({
      user_id: _user.id,
      token: token,
      created: Date.now(),
    })

    await this.email.confirmEmail(_user, token)

    return _user
  }

  // returns user
  async resendEmail(token) {
    let [user] = await TokenMySQL.find({ token })
    if (!user) {
      let err = new Error("Not Found")
      //@ts-ignore
      err.status = 404
      throw err
    }
    await this.email.confirmEmail(user, token)
    return user
  }

  // returns user
  async confirmEmail(token) {
    let [{ user_id: userId }] = await TokenMySQL.find({ token })
    if (!userId) {
      let err = new Error("Not Found")
      //@ts-ignore
      err.status = 404
      throw err
    }
    await TokenMySQL.remove(userId)
    await UserMySQL.update(userId, { disabled: null })
    let [user] = await this.find({ id: userId })
    return user
  }

  // returns user
  async authenticatePassword(email, password) {
    let [user] = await UserMySQL.find({ email })
    if (user && auth.comparePassword(password, user.password)) {
      delete user.password
      return user
    } else {
      let err = new Error("Unauthorized")
      //@ts-ignore!!!
      err.status = 401
      throw err
    }
  }

  // returns user
  async update(userId, user) {
    user = await validate.partialUser(user)
    let { email, password } = user

    if (password) {
      password = auth.hashPassword(password)
    }

    if (email) {
      await this.uniqueEmail(email, userId)
      let token = auth.generateToken()
      await TokenMySQL.insert({
        user_id: userId,
        token: token,
        pending_email: email,
        created: Date.now(),
      })
      await this.email.confirmEmailUpdate(user, token)
      delete user.email
    }

    await UserMySQL.update(userId, user)
    ;[user] = await this.find({ id: userId })
    return user
  }

  // returns undefined
  async confirmEmailUpdate(token) {
    let { user_id: userId, pending_email: email } = await TokenMySQL.find({
      token,
    })
    await UserMySQL.update(userId, { email })
    await TokenMySQL.remove(token)
  }

  // returns undefined
  async forgotPassword(email) {
    //@ts-ignore
    let [user] = this.find({ email })
    if (!user) {
      let err = new Error("Not Found")
      //@ts-ignore
      err.status = 404
      throw err
    }
    let token = auth.generateToken()
    await TokenMySQL.insert({
      user_id: user.id,
      token: token,
      created: Date.now(),
    })
    await this.email.forgotPassword(user, token)
  }

  // returns user
  async resetPassword(token, password) {
    let { user_id: userId } = await TokenMySQL.find({ token })
    let user = await this.update(userId, { password })
    await TokenMySQL.remove(token)
    return user
  }

  //  --------------------------- ONLY EXTERNAL USERS ---------------------------

  // returns user
  async updateExternal(userId, user) {
    let { email } = user
    if (email) {
      await this.uniqueEmail(email)
    }
    await UserMySQL.update(userId, user)
    ;[user] = await this.find({ id: userId })
    return user
  }

  async uniqueEmail(email, userId) {
    let [user] = await UserMySQL.find({ email })
    if (user && user.id !== parseInt(userId)) {
      let err = new Error("Email " + email + " is already in use")
      //@ts-ignore
      err.status = 409
      throw err
    }
  }
}

module.exports = User
