// External Modules

const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy

// Internal Modules
const config = require("../../../config")
const User = require("../../../models/user-actions/user-actions")
const utils = require("../../../utils/index")

import UserActions from "../../../models/user-actions/user-actions"

export function getStrategies({ userActions }: { userActions: UserActions }) {
  const localStrategy = new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        let user = await userActions.authenticatePassword(email, password)
        done(null, user)
      } catch (e) {
        done(e)
      }
    },
  )

  const extactFromCookie = request => {
    let token = null
    if (request && request.cookies) token = request.cookies["token"]
    return token
  }

  const jwtStrategy = new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([extactFromCookie]),
      secretOrKey: config.auth.jwt.secret,
    },
    async (jwt, done) => {
      try {
        let user = await userActions.find({ id: jwt.id })[0]
        if (!user) {
          let err = new Error("Unauthorized")
          //@ts-ignore
          err.status = 401
          throw err
        }
        done(null, user)
      } catch (e) {
        done(e)
      }
    },
  )

  const linkedInStrategy = new LinkedInStrategy(
    {
      clientID: config.auth.linkedin.clientID,
      clientSecret: config.auth.linkedin.clientSecret,
      callbackURL: config.auth.linkedin.callbackURL,
      scope: ["r_emailaddress", "r_basicprofile"],
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        // try to find user by provider
        let user = (await userActions.find({
          provider_id: profile.id,
          provider: profile.provider,
        }))[0]
        if (!user) {
          // try to find user by email
          user = (await userActions.find({ email: profile.emails[0].value }))[0]
          if (user) {
            // user email exists, transfer user to SSO
            let update = {
              provider_id: profile.id,
              provider: profile.provider,
            }
            user = await userActions.updateExternal(user.id, update)
          } else {
            // user is new, create user
            user = {
              fname: profile.name.givenName,
              lname: profile.name.familyName,
              email: profile.emails[0].value,
              provider_id: profile.id,
              provider: profile.provider,
              created: Date.now(),
              role: "user",
            }
            await userActions.insert(user)
            user = (await userActions.find({ email: user.email }))[0]
          }
        } else {
          let update = utils.difference(
            {
              fname: user.fname,
              lname: user.lname,
              email: user.email,
            },
            {
              fname: profile.name.givenName,
              lname: profile.name.familyName,
              email: profile.emails[0].value,
            },
          )
          if (Object.keys(update).length) {
            user = await userActions.updateExternal(user.id, update)
          }
        }
        done(null, user)
      } catch (e) {
        done(e)
      }
    },
  )
  const googleStrategy = new GoogleStrategy(
    {
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackURL,
      scope: ["profile", "email"],
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        // try to find user by provider
        let user = (await userActions.find({
          provider_id: profile.id,
          provider: profile.provider,
        }))[0]
        if (!user) {
          // try to find user by email
          user = (await userActions.find({ email: profile.emails[0].value }))[0]
          if (user) {
            // user email exists, transfer user to SSO
            let update = {
              provider_id: profile.id,
              provider: profile.provider,
            }
            user = await userActions.updateExternal(user.id, update)
          } else {
            // user is new, create user
            user = {
              fname: profile.name.givenName,
              lname: profile.name.familyName,
              email: profile.emails[0].value,
              provider_id: profile.id,
              provider: profile.provider,
              created: Date.now(),
              role: "user",
            }
            await userActions.insert(user)
            user = (await userActions.find({ email: user.email }))[0]
          }
        } else {
          let update = utils.difference(
            {
              fname: user.fname,
              lname: user.lname,
              email: user.email,
            },
            {
              fname: profile.name.givenName,
              lname: profile.name.familyName,
              email: profile.emails[0].value,
            },
          )
          if (Object.keys(update).length) {
            user = await userActions.updateExternal(user.id, update)
          }
        }
        done(null, user)
      } catch (e) {
        done(e)
      }
    },
  )

  return {
    localStrategy,
    jwtStrategy,
    googleStrategy,
    linkedInStrategy,
  }
}
