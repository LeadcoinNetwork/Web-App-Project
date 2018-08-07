import { NewUserInterface, disabledReason } from "../models/users/types"
import * as auth from "../models/user-auth/user-auth"
import * as utils from "../utils/index"

import * as userAuth from "../models/user-auth/user-auth"
import * as UserValidate from "../models/user-validate/user-validate"

import * as Chance from "chance"

const chance = new Chance()

import NotFound from "../utils/not-found"

import { IModels } from "./index"
interface ICompleteProfile {
  company: string
  country: string
  phone: string
}

export default class Auth {
  constructor(private models: IModels) {}

  private async login(user_id): Promise<string> {
    return userAuth.generateJWT(user_id, this.models.config.auth.jwt.secret)
  }

  async loginUserNameAndPassword(user_id): Promise<string> {
    return this.login(user_id)
  }

  async sendForgotPasswordEmail(email): Promise<boolean> {
    var { users, emailSender, emailCreator } = this.models
    const user = await users.getOne({ email })
    if (user instanceof NotFound) {
      return false
    } else {
      const new_password = chance.string({
        pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        length: 8,
      })
      await this.models.users.updateUser(user.id, {
        password: new_password,
      })
      var str = emailCreator.forgotPassword(user, new_password)
      await emailSender.send(str)
      return true
    }
  }

  async LoginSocial({ provider_id, provider, email, fname, lname, balance }) {
    let user = await this.models.users.getOne({
      provider_id: provider_id,
      provider: provider,
    })
    if (user instanceof NotFound) {
      // user never sign using this provider

      // try to find user by email
      let user = await this.models.users.getOne({
        email,
      })
      if (user instanceof NotFound) {
        // user never signin using same email

        // create a new user
        let user = {
          fname,
          lname,
          email,
          balance,
          provider_id: provider_id,
          provider: provider,
          created: Date.now(),
          role: "user",
        }
        var result = await this.models.users.createUser(user)

        return this.login(result)
      } else {
        // user email exists, but user never signup using SSO

        let update = {
          provider_id: provider_id,
          provider: provider,
        }
        await this.models.users.updateUser(user.id, update)
        return this.login(user.id)
      }
    } else {
      // user already logged in using same provider.

      // update user details from provider
      let update = utils.difference(
        {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
        },
        {
          fname,
          lname,
          email,
        },
      )
      if (Object.keys(update).length) {
        await this.models.users.updateUser(user.id, update)
      }
      return this.login(user.id)
    }
  }
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
      if (!this.models.config.AUTO_CONFIRM_EMAIL) {
        user.disabled = disabledReason.EMAIL_NOT_VERIFIED
        user.emailConfirmationKey = auth.generateToken()
        var str = emailCreator.confirmEmail(user, user.emailConfirmationKey)
        await emailSender.send(str)
      }
    }
    if (!shouldValidate) {
      if (!this.models.config.SKIP_COMPLETE_PROFILE) {
        user.disabled = disabledReason.PROFILE_NOT_COMPLETED
      }
    }

    // set balance to user
    user.balance = this.models.config.INITIAL_BALANCE

    var newUserid = await users.createUser(user)
    let token = auth.generateJWT(newUserid, config.auth.jwt.secret)
    return {
      user: newUserid,
      token,
    }
  }

  async setNewPassword(user_id, new_password) {
    let { users } = this.models
    return users.setNewPassword(user_id, new_password)
  }

  async resendConfirmationEmail(user) {
    var { users, emailSender, emailCreator } = this.models
    const { emailConfirmationKey } = user
    var str = emailCreator.confirmEmail(user, emailConfirmationKey)
    await emailSender.send(str)
    return users.updateUser(user.id, { emailConfirmationKey })
  }

  async completeProfile(user_id, completeProfile: ICompleteProfile) {
    var { users } = this.models
    var { company, phone, country } = completeProfile
    if (!company) throw new Error("Company not valid")
    if (!phone) throw new Error("Phone not valid")
    if (!country) throw new Error("Country not valid")
    return users.updateUser(user_id, {
      company,
      phone,
      country,
      disabled: null,
    })
  }

  async tryConfirmEmailByKey(
    key: string,
  ): Promise<{ ok: boolean; token?: string }> {
    var { users } = this.models
    var user = await users.getOne({ emailConfirmationKey: key })
    if (user instanceof NotFound) {
      return { ok: false }
    } else {
      await users.updateUser(user.id, {
        disabled: disabledReason.PROFILE_NOT_COMPLETED,
      })
      var token = userAuth.generateJWT(
        user.id,
        this.models.config.auth.jwt.secret,
      )
      return { ok: true, token }
    }
  }
}

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
