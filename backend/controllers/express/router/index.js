//@ts-check

const _404 = require("./404")
const errorhandler = require("./errorhandler")
var userRouter = require("./user")
var auth = require("./auth")
var leads = require("./leads")
var csv = require("./csv")
const cors = require("./cors")
const url = require("url")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const AppPassports = require("../passport/index")

module.exports.start = function({ app, frontend, email, user }) {
  app.use(bodyParser.json())
  app.use(cookieParser())
  cors.start(app, frontend)

  AppPassports.start({ UserModel: user, app, EmailModel: email })

  auth.start({
    app,
    email,
    frontend,
    user,
  })

  userRouter.start({
    app,
    email,
    user,
  })

  app.use(leads)
  app.use(csv)
  _404.start(app)
  errorhandler.start(app)
}
