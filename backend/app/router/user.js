const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../controller/user");

const router = express.Router();
module.exports = router;

router.use("/user/*", authenticate);

router.post("/user", create);
router.get("/user/:userId", findById);
router.put("/user/:userId", updateById);
router.delete("/user/:userId", deleteById);

router.post("/login", login);

async function create(req, res, next) {
  try {
    var user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

async function deleteById(req, res, next) {
  try {
    var status = await User.deleteById(req.params.userId);
    if (status) {
      res.status(200).json({
        ok: true
      });
    } else {
      res.status(404).json({
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function findById(req, res, next) {
  try {
    var user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function updateById(req, res, next) {
  try {
    var user = await User.updateById(req.params.userId, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}

function login(req, res, next) {
  passport.authenticate(
    "local",
    {
      session: false
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        err = new Error((info && info.message) || "Unauthorized");
        err.status = 401;
        return next(err);
      }
      req.login(user, { session: false }, err => {
        if (err) return next(err);
        let token = jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          config.jwtSecret,
          {
            expiresIn: config.jwtExpiresIn
          }
        );
        res.json({ user, token });
      });
    }
  )(req, res, next);
}

function authenticate(req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        err = new Error((info && info.message) || "Unauthorized");
        err.status = 401;
        return next(err);
      }
      req.login(user, { session: false }, err => {
        if (err) return next(err);
        next();
      });
    }
  )(req, res, next);
}
