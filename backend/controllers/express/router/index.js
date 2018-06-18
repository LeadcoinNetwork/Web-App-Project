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

module.exports.start = function({ app, frontend, email, user }) {
  app.use(bodyParser.json())
  app.use(cookieParser())
  cors.start(app, frontend)
  userRouter.start({
    app,
    email,
    user,
  })

  auth.start({
    app,
    email,
    frontend,
    user,
  })

  app.use(leads)
  app.use(csv)
  _404.start(app)
  errorhandler.start(app)
}
