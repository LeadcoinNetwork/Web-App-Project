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

import UserActions from "../../../models/user-actions/user-actions"
import EmailCreator from "../../../models/email-creator/email-creator"
import EmailSender from "../../../models/emailsender/abstraction"

export function start({
  app,
  userActions,
  emailCreator,
  emailSender,
}: {
  app
  userActions: UserActions
  emailCreator: EmailCreator
  emailSender: EmailSender
}) {
  app.route("/user").post(register)

  app
    .route("/me")
    .all(passport.authenticate("jwt", authOptions))
    .get(get)

  app
    .route("/user/:userId")
    .all(passport.authenticate("jwt", authOptions))
    .get(find)
    .put(update)
    .delete(remove)

  async function get(req, res, next) {
    res.send({ user: req.user })
  }
  async function register(req, res, next) {
    try {
      let _user = await userActions.register(req.body)
      let token = auth.generateJWT(_user)
      res.status(201) // Created
      res.cookie("token", token)
      res.json({ user: _user, token })
    } catch (e) {
      next(e)
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
