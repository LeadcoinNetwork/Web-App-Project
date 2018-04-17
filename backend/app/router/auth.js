const express = require("express");
const User = require("../controller/user");
const auth = require("../lib/auth");

const router = express.Router();
module.exports = router;

router.get("/auth/activate", activateByKey, login);
router.post("/auth/login", auth.authenticate("local"), login);

router.get("/auth/google", auth.authenticate("google"), login);
router.get("/auth/google/callback", auth.authenticate("google"), login);

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
