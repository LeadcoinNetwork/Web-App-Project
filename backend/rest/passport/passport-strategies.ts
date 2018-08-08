// External Modules

const JWTStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy
import NotFound from "../../utils/not-found"
import LogModelActions from "../../models/log-model-actions/log-model-actions"
import AppLogic from "../../app-logic/index"

// Internal Modules
import * as utils from "../../utils/index"

export function getStrategies({ appLogic }: { appLogic: AppLogic }) {
  var config = appLogic.config

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
      var user = await appLogic.models.users.tryGetById(jwt.id)
      if (user instanceof NotFound) {
        LogModelActions("jwt", "login failure", "unauthorized")
        let err = new Error("Unauthorized")
        //@ts-ignore
        err.status = 401
        done(err)
      } else {
        LogModelActions("jwt", "login success", user.id)
        done(null, user)
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
      // try {
      //   // try to find user by provider
      //   let user = (await userActions.find({
      //     provider_id: profile.id,
      //     provider: profile.provider,
      //   }))[0]
      //   if (!user) {
      //     // try to find user by email
      //     user = (await userActions.find({ email: profile.emails[0].value }))[0]
      //     if (user) {
      //       // user email exists, transfer user to SSO
      //       let update = {
      //         provider_id: profile.id,
      //         provider: profile.provider,
      //       }
      //       user = await userActions.updateExternal(user.id, update)
      //     } else {
      //       // user is new, create user
      //       user = {
      //         fname: profile.name.givenName,
      //         lname: profile.name.familyName,
      //         email: profile.emails[0].value,
      //         provider_id: profile.id,
      //         provider: profile.provider,
      //         created: Date.now(),
      //         role: "user",
      //       }
      //       await userActions.insert(user)
      //       user = (await userActions.find({ email: user.email }))[0]
      //     }
      //   } else {
      //     let update = utils.difference(
      //       {
      //         fname: user.fname,
      //         lname: user.lname,
      //         email: user.email,
      //       },
      //       {
      //         fname: profile.name.givenName,
      //         lname: profile.name.familyName,
      //         email: profile.emails[0].value,
      //       },
      //     )
      //     if (Object.keys(update).length) {
      //       user = await userActions.updateExternal(user.id, update)
      //     }
      //   }
      //   done(null, user)
      // } catch (e) {
      //   done(e)
      // }
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
      // try to find user by provider
      ;(async () => {
        const _done = (...args) => {
          //TODO?: log
          done(...args)
        }
        let user = await appLogic.models.users.getOne({
          provider_id: profile.id,
          provider: profile.provider,
        })
        if (user instanceof NotFound) {
          // user never sign using this provider

          // try to find user by email
          let user = await appLogic.models.users.getOne({
            email: profile.emails[0].value,
          })
          if (user instanceof NotFound) {
            // user never signin using same email

            // create a new user
            let user = {
              fname: profile.name.givenName,
              lname: profile.name.familyName,
              email: profile.emails[0].value,
              provider_id: profile.id,
              provider: profile.provider,
              balance: config.INITIAL_BALANCE,
              created: Date.now(),
              role: "user",
            }
            var { user: user_id } = await appLogic.auth.register(user, false)

            _done(null, { user })
          } else {
            // user email exists, but user never signup using SSO

            let update = {
              provider_id: profile.id,
              provider: profile.provider,
            }
            await appLogic.models.users.updateUser(user.id, update)
            _done(null, Object.assign({}, user, update))
          }
        } else {
          // user already logged in using same provider.

          // update user details from provider
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
            await appLogic.models.users.updateUser(user.id, update)
          }
          _done(null, user)
        }
      })().catch(done)
    },
  )

  return {
    jwtStrategy,
    googleStrategy,
    linkedInStrategy,
  }
}
