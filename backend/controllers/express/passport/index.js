const strategies = require("./passport-strategies")
const passport = require("passport")

function start(app, mailer) {
  app.use(passport.initialize())

  passport.use(strategies.localStrategy({ mailer }))
  passport.use(strategies.jwtStrategy)
  passport.use(strategies.googleStrategy)
  passport.use(strategies.linkedInStrategy)
}

module.exports = {
  start,
}
