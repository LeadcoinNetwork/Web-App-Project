//@ts-check

// external modules
const passport = require("passport")

// internal modules
const User = require("../../../models/user-actions/user-actions")
const auth = require("../../../models/auth/auth")

const authOptions = {
  session: false,
  // failWithError is not documented (as of Apr 2018)
  // see https://github.com/passport/www.passportjs.org/pull/51
  failWithError: true,
}

import UserActions from "../../../models/users/users"
import EmailCreator from "../../../models/email-creator/email-creator"
import EmailSender from "../../../models/emailsender/abstraction"

import AppLogic from "../../../app-logic/index"

export function start({
  expressApp,
  appLogic,
}: {
  expressApp
  appLogic: AppLogic
}) {
  expressApp.route("/user").post(register)

  expressApp
    .route("/me")
    .all(passport.authenticate("jwt", authOptions))
    .get(get)

  expressApp
    .route("/user/:userId")
    .all(passport.authenticate("jwt", authOptions))
    .get(find)
    .put(update)
    .delete(remove)

  async function get(req, res, next) {
    res.send({ user: req.user })
  }
  async function register(req, res, next) {
    var [{ user, token }, error] = await appLogic.userRegister.register({
      ...req.body,
    })

    if (error) {
      res.status(400)
      res.json({ error })
    } else {
      res.status(201) // Created
      res.cookie("token", token)
      res.json({ user, token })
    }
  }

  async function remove(req, res, next) {
    try {
      let status = await userActions.remove(req.params.userId)
      if (status) {
        res.status(200).json({
          ok: true,
        })
      } else {
        res.status(404).json({
          path: "remove",
          error: "Not Found",
        })
      }
    } catch (e) {
      next(e)
    }
  }

  async function find(req, res, next) {
    try {
      let _user = (await userActions.find({ id: req.params.userId }))[0]
      if (_user) {
        res.status(200).json(_user)
      } else {
        res.status(404).json({
          path: "find",
          error: "Not Found",
        })
      }
    } catch (e) {
      next(e)
    }
  }

  async function update(req, res, next) {
    try {
      let _user = await userActions.update(req.params.userId, req.body)
      if (_user) {
        res.status(200).json(_user)
      } else {
        res.status(404).json({
          path: "update",
          error: "Not Found",
        })
      }
    } catch (e) {
      next(e)
    }
  }
}
