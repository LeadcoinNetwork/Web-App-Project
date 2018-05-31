const express = require("express");
const passport = require("passport");
const User = require("../controller/user");
const auth = require("../lib/auth");
const mail = require("../lib/mail");
const config = require("../config");

const router = express.Router();
module.exports = router;

const authOptions = {
  session: false
};

router.post("/auth/login", passport.authenticate("local", authOptions), login);
router.get("/auth/confirm-email", confirmEmail, login);
router.get(
  "/auth/resend-email",
  passport.authenticate("jwt", authOptions),
  resendEmail
);
router.get("/auth/confirm-email-update", confirmEmailUpdate);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword, login);

router.get(
  ["/auth/google", "/auth/google/callback"],
  passport.authenticate("google", authOptions),
  login
);

router.get(
  ["/auth/linkedin", "/auth/linkedin/callback"],
  passport.authenticate("linkedin", authOptions),
  login
);

router.get(
  ["/auth/facebook", "/auth/facebook/callback"],
  passport.authenticate("facebook", authOptions),
  login
);

async function resendEmail(req, res, next) {
  try {
    let user = req.user;
    let token = await User.login(user.id);
    await mail.confirmEmail(user, token);
    res.json({ user, token });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    let user = req.user;
    let token = await User.login(user.id);
    res.cookie("token", token);
    res.cookie("user", JSON.stringify(user));
    if (user.provider) {
      res.redirect(config.frontend);
    } else {
      res.json({ user, token });
    }
  } catch (e) {
    next(e);
  }
}

async function confirmEmail(req, res, next) {
  try {
    let { token } = req.query;
    let user = await User.confirmEmail(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        path: "confirmMail",
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function confirmEmailUpdate(req, res, next) {
  try {
    let { token } = req.query;
    await User.confirmEmailUpdate(token);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function forgotPassword(req, res, next) {
  try {
    let { email } = req.body;
    await User.forgotPassword(email);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

async function resetPassword(req, res, next) {
  try {
    let { token, password } = req.body;
    let user = await User.resetPassword(token, password);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        path: "resetPass",
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}
