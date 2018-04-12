const express = require("express");
const config = require("../config");
const User = require("../controller/user");
const auth = require("../lib/auth");

const router = express.Router();
module.exports = router;

router.post("/user", create, login);

router
  .route("/user/:userId")
  .all(auth.authenticate("jwt"))
  .get(findById)
  .put(updateById)
  .delete(deleteById);

router.post("/login", auth.authenticate("local"), login);

async function create(req, res, next) {
  try {
    req.user = await User.create(req.body);
    res.status(201); // Created
    next();
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

async function login(req, res, next) {
  try {
    let { user, token } = await User.login(req.user);
    res.json({ user, token });
  } catch (e) {
    next(e);
  }
}
