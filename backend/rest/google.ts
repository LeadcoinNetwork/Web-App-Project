import * as Express from "express"
import AppLogic from "../app-logic/index"
var request = require("request-promise")
import NotFound from "../utils/not-found"

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  appLogic.config.auth.google.clientID
  expressApp.get("/auth/google", (req, res) => {
    res.redirect(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=" +
        encodeURIComponent(appLogic.config.backend + "/auth/google/callback") +
        "&scope=profile%20email&client_id=" +
        appLogic.config.auth.google.clientID +
        "&state=" +
        encodeURIComponent(req.query.state),
    )
  })
  expressApp.get("/auth/google/callback", async (req, res) => {
    var ans = await request({
      url: "https://www.googleapis.com/oauth2/v4/token",
      method: "POST",
      json: true,
      form: {
        code: req.query.code,
        client_id: appLogic.config.auth.google.clientID,
        client_secret: appLogic.config.auth.google.clientSecret,
        redirect_uri: appLogic.config.backend + "/auth/google/callback",
        grant_type: "authorization_code",
      },
    })
    var url =
      `https://www.googleapis.com/plus/v1/people/me?access_token=` +
      ans.access_token
    var ans2 = await request({
      url,
      json: true,
      //   headers: { Authorization: "Bearer " + ans.access_token },
    })
    var profile = ans2
    var token = await appLogic.auth.LoginSocial({
      provider_id: profile.id,
      provider: "google",
      balance: appLogic.config.INITIAL_BALANCE,
      email: profile.emails[0].value,
      fname: profile.name.givenName,
      lname: profile.name.familyName,
    })
    res.cookie("token", token)
    res.redirect(req.query.state)
  })
}
