const strategies = require("./passport-strategies")
const passport = require("passport")

function start({ app, UserModel, EmailModel }) {
  app.use(passport.initialize())

  var s = strategies.getStrategies({ UserModel })

  passport.use(s.localStrategy)
  passport.use(s.jwtStrategy)
  passport.use(s.googleStrategy)
  passport.use(s.linkedInStrategy)
}

module.exports = {
  start,
}
