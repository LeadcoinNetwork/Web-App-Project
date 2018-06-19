//@ts-check

// external modules
const express = require("express")
const passport = require("passport")

// internal modules
const User = require("../../../models/user/user")
const auth = require("../../../models/auth/auth")

module.exports = {
  start,
}

const authOptions = {
  session: false,
  // failWithError is not documented (as of Apr 2018)
  // see https://github.com/passport/www.passportjs.org/pull/51
  failWithError: true,
}

function start({ app, user, email }) {
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
      let _user = await user.register(req.body)
      console.log(_user)
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
      let status = await user.remove(req.params.userId)
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
      let [_user] = await user.find({ id: req.params.userId })
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
      let _user = await user.update(req.params.userId, req.body)
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
