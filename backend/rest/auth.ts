//@ts-check
// external modules
const passport = require("passport")

const authOptions = {
  session: false,
}

import * as Express from "express"
import AppLogic from "../app-logic/index"
import NotFound from "../utils/not-found"

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  expressApp.post("/auth/logout", logout)
  expressApp.get("/auth/confirm-email", confirmEmail, login)
  expressApp.get("/auth/confirm-email-update", confirmEmailUpdate)
  expressApp.post("/auth/forgot-password", forgotPassword)
  expressApp.post("/auth/reset-password", resetPassword, login)

  expressApp.get(
    "/auth/resend-email",
    passport.authenticate("jwt", authOptions),
    resendEmail,
  )

  expressApp.post(
    "/auth/login",
    passport.authenticate("local", authOptions),
    login,
  )

  expressApp.get(
    ["/auth/google", "/auth/google/callback"],
    passport.authenticate("google", authOptions),
    login,
  )

  expressApp.get(
    ["/auth/linkedin", "/auth/linkedin/callback"],
    passport.authenticate("linkedin", authOptions),
    login,
  )

  expressApp.get(
    ["/auth/facebook", "/auth/facebook/callback"],
    passport.authenticate("facebook", authOptions),
    login,
  )

  async function resendEmail(req, res, next) {
    // try {
    //   let _user = req.user
    //   // let token = await userActions.login(_user.id)
    //   await emailCreator.confirmEmail(_user, token)
    //   res.json({ user: _user, token })
    // } catch (e) {
    //   next(e)
    // }
  }

  async function login(req, res, next) {
    var token = await appLogic.userLogin.login(req.user.id)
    res.cookie("token", token)
    res.redirect(appLogic.config.frontend)
    // if (pass instanceof NotFound) {
    // res.status(400)
    // res.send({ error: "not auth" })
    // } else {
    // res.send({ token: pass })
    // }
    // try {
    //   console.log("@")
    //   let _user = req.user
    //   // let token = await appLog.login(_user.id)
    //   res.cookie("token", token)
    //   if (_user.provider) {
    //     res.redirect(frontend)
    //   } else {
    //     res.json({ user: _user, token })
    //   }
    // } catch (e) {
    //   next(e)
    // }
  }

  async function logout(req, res) {
    res.clearCookie("token")
    res.json({ logout: "success" })
  }

  async function confirmEmail(req, res, next) {
    // try {
    //   let { token } = req.query
    //   // let _user = await userActions.confirmEmail(token)
    //   if (_user) {
    //     req.user = _user
    //     next()
    //   } else {
    //     res.status(404).json({
    //       path: "confirmMail",
    //       error: "Not Found",
    //     })
    //   }
    // } catch (e) {
    //   next(e)
    // }
  }

  async function confirmEmailUpdate(req, res, next) {
    try {
      var ok = await appLogic.userRegister.tryConfirmEmailByKey(req.query.key)
      res.json({ ok })
    } catch (e) {
      next(e)
    }
  }

  async function forgotPassword(req, res, next) {
    // try {
    //   let { email } = req.body
    //   // await userActions.forgotPassword(email)
    //   res.json({ ok: true })
    // } catch (e) {
    //   next(e)
    // }
  }

  async function resetPassword(req, res, next) {
    // try {
    //   let { token, password } = req.body
    //   let _user = await userActions.resetPassword(token, password)
    //   if (_user) {
    //     req.user = _user
    //     next()
    //   } else {
    //     res.status(404).json({
    //       path: "resetPass",
    //       error: "Not Found",
    //     })
    //   }
    // } catch (e) {
    //   next(e)
    // }
  }
}
