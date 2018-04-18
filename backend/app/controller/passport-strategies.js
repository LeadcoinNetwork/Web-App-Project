const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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
    console.log(accessToken, refreshToken, profile);
    try {
      let user = await User.findByProviderId(profile.provider, profile.id);
      if (!user) {
        user = {
          fname: profile.name.givenName,
          lname: profile.name.familyName,
          email: profile.emails[0].value,
          provider_id: profile.id,
          provider: profile.provider,
          created: Date.now(),
          role: "user"
        };
        await validate.preventDuplicateEmail(user.email);
        await User.create(user);
        user = await User.findByEmail(user.email);
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret,
    callbackURL: config.auth.facebook.callbackURL,
    scope: ["email"],
    profileFields: ["id", "name", "email"]
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
    try {
      let user = await User.findByProviderId(profile.provider, profile.id);
      if (!user) {
        user = {
          fname: profile.name.givenName,
          lname: profile.name.familyName,
          email: profile.emails[0].value,
          provider_id: profile.id,
          provider: profile.provider,
          created: Date.now(),
          role: "user"
        };
        await validate.preventDuplicateEmail(user.email);
        await User.create(user);
        user = await User.findByEmail(user.email);
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
  googleStrategy,
  facebookStrategy
};
