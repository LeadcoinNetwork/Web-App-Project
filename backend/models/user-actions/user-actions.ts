const auth = require("../auth/auth")
const validate = require("../validate/validate")
const TokenMySQL = require("../token-mysql/token-mysql")
import * as UserMySQL from "../user-mysql/user-mysql"

import EmailCreator from "../email-creator/email-creator"
import EmailSender from "../emailsender/abstraction"
import EmailSenderError from "../emailsender/error"

import {
  NewUserInterface,
  ExistingUserInterface,
} from "../user-types/user-types"

class User {
  emailSender: EmailSender
  emailCreator: EmailCreator

  constructor({
    emailSender,
    emailCreator,
  }: {
    emailSender?: EmailSender
    emailCreator?: EmailCreator
  }) {
    if (!emailSender) {
      emailSender = new EmailSenderError()
    }
    if (!emailCreator) {
      emailCreator = new EmailCreator({ backend: "", from: "" })
    }
    Object.assign(this, { emailSender, emailCreator })
  }

  async insert(user: NewUserInterface): Promise<ExistingUserInterface> {
    let { email } = user
    await this.uniqueEmail(email)
    user.created = Date.now()
    await UserMySQL.insert(user)
    return await this.find({ email })
  }

  async find(condition, fields?): Promise<ExistingUserInterface> {
    let users = await UserMySQL.find(condition, fields)

    users = users.map(user => {
      //@ts-ignore
      delete user.password
      return user
    })
    if (users.length > 0) return users[0]
    else {
      Promise.reject(new Error("cannot find user"))
    }
  }

  async remove(userId): Promise<boolean> {
    return await UserMySQL.remove(userId)
  }

  async login(userId): Promise<string> {
    let user = (await this.find({ id: userId }))[0]

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
  async register(user): Promise<ExistingUserInterface> {
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
    await this.emailSender.send(this.emailCreator.confirmEmail(_user, token))

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
    await this.emailSender.send(this.emailCreator.confirmEmail(user, token))
    return user
  }

  async activateUser({ user_id }: { user_id: number }) {
    return await UserMySQL.update(user_id, { disabled: null })
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
    let user = await this.find({ id: userId })
    return user
  }

  // returns user
  async authenticatePassword(email, password) {
    let [user] = await UserMySQL.find({ email })
    if (user && auth.comparePassword(password, user.password)) {
      //@ts-ignore
      delete user.password
      return user
    } else {
      let err = new Error("Unauthorized")
      //@ts-ignore!!!
      err.status = 401
      throw err
    }
  }

  async update(userId, user): Promise<ExistingUserInterface> {
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
      await this.emailSender.send(
        this.emailCreator.confirmEmailUpdate(user, token),
      )
      delete user.email
    }

    await UserMySQL.update(userId, user)
    return await this.find({ id: userId })
  }

  // returns undefined
  async confirmEmailUpdate(token: string) {
    let { user_id: userId, pending_email: email } = await TokenMySQL.find({
      token,
    })
    await UserMySQL.update(userId, { email })
    await TokenMySQL.remove(token)
  }

  // returns undefined
  async forgotPassword(email) {
    //@ts-ignore
    let user = await this.find({ email })
    let token = auth.generateToken()
    await TokenMySQL.insert({
      user_id: user.id,
      token: token,
      created: Date.now(),
    })
    await this.emailSender.send(this.emailCreator.forgotPassword(user, token))
  }

  // returns user
  async resetPassword(token, password) {
    let { user_id: userId } = await TokenMySQL.find({ token })
    let user = await this.update(userId, { password })
    await TokenMySQL.remove(token)
    return user
  }

  //  --------------------------- ONLY EXTERNAL USERS ---------------------------

  async updateExternal(userId, user): Promise<ExistingUserInterface> {
    let { email } = user
    if (email) {
      await this.uniqueEmail(email)
    }
    await UserMySQL.update(userId, user)
    return await this.find({ id: userId })
  }

  async uniqueEmail(email, userId?) {
    let [user] = await UserMySQL.find({ email })
    if (user && user.id !== parseInt(userId)) {
      let err = new Error("Email " + email + " is already in use")
      //@ts-ignore
      err.status = 409
      throw err
    }
  }
}

export default User
