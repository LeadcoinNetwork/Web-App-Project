const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config");
const auth = require("../lib/auth");
const User = require("../model/user");
const validate = require("../lib/validate");

const localStrategy = new LocalStrategy(
  {
    usernameField: "email"
  },
  async (email, password, done) => {
    try {
      let user = await User.findByEmail(email);
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      if (!auth.comparePassword(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      delete user.password;
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwt.secret
  },
  async (jwt, done) => {
    try {
      let user = await User.findById(jwt.id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      delete user.password;
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: config.auth.google.callbackURL,
    scope: ["profile", "email"]
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findBy({
        provider_id: profile.id
      });
      if (!user) {
        user = {
          fname: profile.name.givenName,
          lname: profile.name.familyName,
          email: profile.emails[0].value,
          created: Date.now(),
          role: "user",
          provider_id: profile.id,
          provider: "google"
        };
        await validate.preventDuplicateEmail(user.email);
        await User.create(user);
        user = await User.findBy({ email: user.email });
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

module.exports = {
  localStrategy,
  jwtStrategy,
  googleStrategy
};
