const express = require("express");
const passport = require("passport");
const User = require("../controller/user");
const auth = require("../lib/auth");

const router = express.Router();
module.exports = router;

authOptions = {
  session: false,
  // failWithError is not documented (as of Apr 2018)
  // see https://github.com/passport/www.passportjs.org/pull/51
  failWithError: true
};

router.post("/user", register);

router
  .route("/user/:userId")
  .all(passport.authenticate("jwt", authOptions))
  .get(find)
  .put(update)
  .delete(remove);

async function register(req, res, next) {
  try {
    let user = await User.register(req.body);
    res.status(201); // Created
    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    let status = await User.remove(req.params.userId);
    if (status) {
      res.status(200).json({
        ok: true
      });
    } else {
      res.status(404).json({
        path: 'remove',
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function find(req, res, next) {
  try {
    let [user] = await User.find({ id: req.params.userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        path: 'find',
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    let user = await User.update(req.params.userId, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        path: 'update',
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}
