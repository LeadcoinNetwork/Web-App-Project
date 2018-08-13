//@ts-check
// external modules
const passport = require("passport")

const authOptions = {
  session: false,
}

import * as Express from "express"
import AppLogic from "../app-logic/index"
import NotFound from "../utils/not-found"
import { appLogic } from "../app-logic/types"
import User from "../models/users/users"

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  expressApp.post("/auth/logout", logout)
  //expressApp.get("/auth/confirm-email", confirmEmail, login)
  expressApp.get("/auth/confirm-email-update", confirmEmailUpdate)
  expressApp.post("/auth/forgot-password", forgotPassword)
  expressApp.post("/auth/reset-password", resetPassword, login)

  expressApp.get(
    "/auth/resend-email",
    passport.authenticate("jwt", authOptions),
    resendEmail,
  )

  expressApp.post("/auth/login", loginByUserNameAndPassword, login)
  expressApp.post(
    "/auth/update-password",
    passport.authenticate("jwt", authOptions),
    async (req, res, next) => {
      const { user } = req
      const { newPassword, currentPassword } = req.body
      let maybeUser = await appLogic.models.users.getUserByEmailAndPassword(
        user.email,
        currentPassword,
      )
      if (maybeUser instanceof NotFound) {
        res.status(409).send({ error: "wrong password supplied" })
      } else {
        const done = await appLogic.auth.setNewPassword(user.id, newPassword)
        res.send({ done })
      }
    },
  )

  // expressApp.get(
  //   ["/auth/linkedin", "/auth/linkedin/callback"],
  //   passport.authenticate("linkedin", authOptions),
  //   login,
  // )

  expressApp.get(
    ["/auth/facebook", "/auth/facebook/callback"],
    passport.authenticate("facebook", authOptions),
    login,
  )

  async function loginByUserNameAndPassword(req, res, next) {
    var { email, password } = req.body
    let user = await appLogic.models.users.getUserByEmailAndPassword(
      email,
      password,
    )
    if (user instanceof NotFound) {
      res
        .status(409)
        .send({
          error: {
            credentials: "The username or password you entered is incorrect",
          },
        })
    } else {
      var token = await appLogic.auth.loginUserNameAndPassword(user.id)
      res.cookie("token", token)
      res.send({ user })
    }
  }
  async function login(req, res, next) {
    if (req.user && req.user.id) {
      var token = await appLogic.auth.loginUserNameAndPassword(req.user.id)
      res.cookie("token", token)
      const { provider } = req.user
      if (provider) return res.redirect(appLogic.config.frontend)
      res.send({ user: req.user })
    } else {
      res.status(409).send({ error: "invalid" })
    }
    // res.redirect(appLogic.config.frontend)
  }

  async function logout(req, res) {
    res.clearCookie("token")
    res.json({ logout: "success" })
  }

  async function resendEmail(req, res, next) {
    ;(async () => {
      const { user } = req
      appLogic.auth
        .resendConfirmationEmail(user)
        .then(() => {
          res.send({ ok: true })
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
    })().catch(err => {
      res.status(400)
      res.send({ error: err.message })
    })
  }

  async function confirmEmailUpdate(req, res, next) {
    try {
      var { ok, token } = await appLogic.auth.tryConfirmEmailByKey(
        req.query.key,
      )

      if (ok) {
        res.cookie("token", token)
        res.redirect(appLogic.config.frontend + "/")
      } else {
        res.status(400)
        res.send({ error: "cannot confirm using this key" })
      }
    } catch (e) {
      next(e)
    }
  }

  // returns true unless critical failure for security reasons (email scraping etc)
  async function forgotPassword(req, res, next) {
    ;(async () => {
      const { email } = req.body
      appLogic.auth
        .sendForgotPasswordEmail(email)
        .then(() => {
          res.status(200)
          res.send({ ok: true })
        })
        .catch(err => {
          console.log("ERROR", err)
          res.status(200)
          res.send({ ok: true })
        })
    })().catch(err => {
      res.status(400)
      res.send({ error: err.message })
    })
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
