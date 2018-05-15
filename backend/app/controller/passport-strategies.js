const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../config");
const auth = require("../lib/auth");
const User = require("./user");
const validate = require("../lib/validate");
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

const localStrategy = new LocalStrategy(
  {
    usernameField: "email"
  },
  async (email, password, done) => {
    try {
      let user = await User.authenticatePassword(email, password);
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

const linkedInStrategy = new LinkedInStrategy({
  clientID: config.auth.linkedin.clientID,
  clientSecret: config.auth.linkedin.clientSecret,
  callbackURL: config.auth.linkedin.callbackURL,
  scope: ['r_emailaddress', 'r_basicprofile']
}, async function(accessToken, refreshToken, profile, done) {
    return
    try {
      let [user] = await User.find({
        provider_id: profile.id,
        provider: profile.provider
      })
      if (!user) {
        //TODO: create used with data from linkedin
      } else {
        //TODO: check if user is different, if so - update
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
)

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwt.secret
  },
  async (jwt, done) => {
    try {
      let [user] = await User.find({ id: jwt.id });
      if (!user) {
        let err = new Error("Unauthorized");
        err.status = 401;
        throw err;
      }
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
      let [user] = await User.find({
        provider_id: profile.id,
        provider: profile.provider
      });
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
        await User.insert(user);
        [user] = await User.find({ email: user.email });
      } else {
        let update = difference(
          {
            fname: user.fname,
            lname: user.lname,
            email: user.email
          },
          {
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            email: profile.emails[0].value
          }
        );
        if (Object.keys(update).length) {
          user = await User.updateExternal(update);
        }
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
    try {
      let [user] = await User.find({
        provider_id: profile.id,
        provider: profile.provider
      });
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
        await User.insert(user);
        [user] = await User.find({ email: user.email });
      } else {
        let update = difference(
          {
            fname: user.fname,
            lname: user.lname,
            email: user.email
          },
          {
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            email: profile.emails[0].value
          }
        );
        if (Object.keys(update).length) {
          user = await User.updateExternal(update);
        }
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
  linkedInStrategy,
  facebookStrategy
};

// taken from https://gist.github.com/Yimiprod/7ee176597fef230d1451#gistcomment-2565071
const { transform, isEqual, isObject } = require("lodash");

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? difference(value, base[key])
          : value;
    }
  });
}
