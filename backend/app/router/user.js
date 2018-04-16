const express = require("express");
const config = require("../config");
const User = require("../controller/user");
const auth = require("../lib/auth");

const router = express.Router();
module.exports = router;

router.post("/user", create);

router.get("/activate", activateByKey, login);

router
  .route("/user/:userId")
  .all(auth.authenticate("jwt"))
  .get(findById)
  .put(updateById)
  .delete(deleteById);

router.post("/login", auth.authenticate("local"), login);

async function create(req, res, next) {
  try {
    let user = await User.create(req.body);
    res.status(201); // Created
    res.json(user);
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
        error: "not found"
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
        error: "not found"
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
        error: "not found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    let user = req.user;
    let { error, token } = await User.login(user.id);
    if (token) {
      res.json({ user, token });
    } else {
      res.status(401).json({ error });
    }
  } catch (e) {
    next(e);
  }
}

async function activateByKey(req, res, next) {
  try {
    let key = req.query.activation_key;
    let user = await User.activateByKey(key);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        error: "not found"
      });
    }
  } catch (e) {
    next(e);
  }
}
