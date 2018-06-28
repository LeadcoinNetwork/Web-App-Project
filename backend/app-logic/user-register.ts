import EmailCreator from "../models/email-creator/email-creator"
import EmailSender from "../models/emailsender/abstraction"

import { NewUserInterface, disabledResons } from "../models/users/types"
import * as auth from "../models/user-auth/user-auth"

import * as UserValidate from "../models/user-validate/user-validate"

import AppLogic from "./index"

import NotFound from "../utils/not-found"

import { IModels } from "./index"

export default class UserRegister {
  constructor(private models: IModels) {}

  async register(
    user: NewUserInterface,
    shouldValidate = true,
  ): Promise<{ user: number; token: string }> {
    var { users, config, emailSender, emailCreator } = this.models

    if (shouldValidate) {
      var rs = await UserValidate.checkNewUserValid(user)
      if (rs instanceof Error) {
        throw rs
      }
      user.disabled = disabledResons.EMAIL_NOT_VERIFIED
      user.emailConfirmationKey = auth.generateToken()
      var str = emailCreator.confirmEmail(user, user.emailConfirmationKey)
      await emailSender.send(str)
    }
    if (!shouldValidate) {
      user.disabled = disabledResons.PROFILE_NOT_COMPLETED
    }
    var newUserid = await users.createUser(user)
    let token = auth.generateJWT(newUserid, config.auth.jwt.secret)
    return {
      user: newUserid,
      token,
    }
  }

  async tryConfirmEmailByKey(
    key: string,
  ): Promise<{ ok: boolean; token?: string }> {
    var { users } = this.models
    var user = await users.getOne({ emailConfirmationKey: key })
    if (user instanceof NotFound) {
      return { ok: false }
    } else {
      await users.activateUser({ user_id: user.id })
      var token = userAuth.generateJWT(
        user.id,
        this.models.config.auth.jwt.secret,
      )
      return { ok: true, token }
    }
  }
}

import * as userAuth from "@/models/user-auth/user-auth"

// // ----------------------------- ONLY LOCAL USERS -----------------------------

//   // returns user
//   async register(user): Promise<ExistingUserInterface> {
//     var _user = await validate.newUser(user)

//     let { email } = _user

//     _user.password = auth.hashPassword(_user.password)
//     _user.disabled = "EMAIL_NOT_VERIFIED"
//     let token = auth.generateToken()
//     _user = await this.insert(_user)

//     await TokenMySQL.insert({
//       user_id: _user.id,
//       token: token,
//       created: Date.now(),
//     })
//     await this.emailSender.send(this.emailCreator.confirmEmail(_user, token))

//     return _user
//   }

//   // returns user
//   async resendEmail(token) {
//     let [user] = await TokenMySQL.find({ token })
//     if (!user) {
//       let err = new Error("Not Found")
//       //@ts-ignore
//       err.status = 404
//       throw err
//     }
//     await this.emailSender.send(this.emailCreator.confirmEmail(user, token))
//     return user
//   }

// 	// returns user
//   async confirmEmail(token) {
//     let [{ user_id: userId }] = await TokenMySQL.find({ token })
//     if (!userId) {
//       let err = new Error("Not Found")
//       //@ts-ignore
//       err.status = 404
//       throw err
//     }
//     await TokenMySQL.remove(userId)
//     await UserMySQL.update(userId, { disabled: null })
//     let user = await this.find({ id: userId })
//     return user
//   }

// // returns undefined
//   async confirmEmailUpdate(token: string) {
//     let { user_id: userId, pending_email: email } = await TokenMySQL.find({
//       token,
//     })
//     await UserMySQL.update(userId, { email })
//     await TokenMySQL.remove(token)
//   }

//   // returns undefined
//   async forgotPassword(email) {
//     //@ts-ignore
//     let user = await this.find({ email })
//     let token = auth.generateToken()
//     await TokenMySQL.insert({
//       user_id: user.id,
//       token: token,
//       created: Date.now(),
//     })
//     await this.emailSender.send(this.emailCreator.forgotPassword(user, token))
//   }

//   // returns user
//   async resetPassword(token, password) {
//     let { user_id: userId } = await TokenMySQL.find({ token })
//     let user = await this.update(userId, { password })
//     await TokenMySQL.remove(token)
//     return user
//   }

//   //  --------------------------- ONLY EXTERNAL USERS ---------------------------

//   async updateExternal(userId, user): Promise<ExistingUserInterface> {
//     let { email } = user
//     if (email) {
//       await this.uniqueEmail(email)
//     }
//     await UserMySQL.update(userId, user)
//     return await this.find({ id: userId })
//   }

//   async uniqueEmail(email, userId?) {
//     let [user] = await UserMySQL.find({ email })
//     if (user && user.id !== parseInt(userId)) {
//       let err = new Error("Email " + email + " is already in use")
//       //@ts-ignore
//       err.status = 409
//       throw err
//     }
//   }
