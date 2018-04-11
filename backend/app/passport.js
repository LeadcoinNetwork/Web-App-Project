const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");

const config = require("./config");
const User = require("./model/user");
const auth = require("./lib/auth");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      User.findByEmail(email)
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          if (!auth.comparePassword(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret
    },
    function(jwt, done) {
      User.findById(jwt.id)
        .then(user => {
          done(null, user);
        })
        .catch(done);
    }
  )
);
