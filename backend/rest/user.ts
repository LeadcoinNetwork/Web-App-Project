//@ts-check

// external modules
const passport = require("passport")
import * as _ from "lodash"

const authOptions = {
  session: false,
  // failWithError is not documented (as of Apr 2018)
  // see https://github.com/passport/www.passportjs.org/pull/51
  failWithError: true,
}

import AppLogic from "../app-logic/index"

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
    .all(passport.authenticate("jwt", { session: false, failWithError: false }))
    .get(get)

  expressApp
    .route("/user/:userId")
    .all(passport.authenticate("jwt", authOptions))
    .get(find)
    .put(update)
    .delete(remove)

  expressApp.post(
    "/complete-profile",
    passport.authenticate("jwt", authOptions),
    completeProfile,
  )

  function completeProfile(req, res) {
    appLogic.auth
      .completeProfile(req.user.id, req.body)
      .then(() => {
        res.send({ ok: true })
      })
      .catch(err => {
        res.status(500).send({ error: err.message })
      })
  }
  async function get(req, res, next) {
    var synsitzedUser = appLogic.userSyntisize(req.user)
    res.send({ user: synsitzedUser })
  }
  async function register(req, res, next) {
    ;(async () => {
      var { user, token } = await appLogic.auth.register({
        ..._.omit(req.body, "password"),
        plainPassword: req.body.password,
      })
      res.status(201) // Created
      var _user = await appLogic.models.users.tryGetById(user)
      res.cookie("token", token)
      res.json({ user: _user, token })
    })().catch(err => {
      res.status(400)
      res.send({ error: err.message })
    })
  }

  async function remove(req, res, next) {
    // try {
    //   let status = await userActions.remove(req.params.userId)
    //   if (status) {
    //     res.status(200).json({
    //       ok: true,
    //     })
    //   } else {
    //     res.status(404).json({
    //       path: "remove",
    //       error: "Not Found",
    //     })
    //   }
    // } catch (e) {
    //   next(e)
    // }
  }

  async function find(req, res, next) {
    // try {
    //   let _user = (await userActions.find({ id: req.params.userId }))[0]
    //   if (_user) {
    //     res.status(200).json(_user)
    //   } else {
    //     res.status(404).json({
    //       path: "find",
    //       error: "Not Found",
    //     })
    //   }
    // } catch (e) {
    //   next(e)
    // }
  }

  async function update(req, res, next) {
    // try {
    //   let _user = await userActions.update(req.params.userId, req.body)
    //   if (_user) {
    //     res.status(200).json(_user)
    //   } else {
    //     res.status(404).json({
    //       path: "update",
    //       error: "Not Found",
    //     })
    //   }
    // } catch (e) {
    //   next(e)
    // }
  }
}
