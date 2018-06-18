//@ts-check

// External Modules
const express = require("express")

// Internal Modules
const config = require("../../config")
const router = require("./router/index")
const http = require("http")
const io = require("./io/io")
const app = express()
const AppPassports = require("./passport/index")

if (config.env === "development") {
  console.log("Allowing orpha/n SSL certificates")
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
}

var httpServer = http.createServer(app)
io.connectToHTTP(httpServer)

const EmailSenderNodeMailer = require("../../models/emailsender-nodemailer/emailsender-nodemailer")
const EmailSenderConsole = require("../../models/emailsender-console/emailsender-console")
const Email = require("../../models/email/email")
const User = require("../../models/user/user")
AppPassports.start(app)

if (config.mail.mailer == "CONSOLE") {
  var EmailSender = new EmailSenderConsole /* {
    host: config.mail.host,
    port: config.mail.port,
    user: config.mail.auth.user,
    pass: config.mail.auth.pass,
  } */()
}
var email = new Email({
  mailSender: EmailSender,
  backend: config.backend,
  from: config.mail.from,
})

var user = new User({
  email,
})

router.start({
  app,
  email: email,
  frontend: config.frontend,
  user,
})

module.exports = httpServer.listen(config.app.port, () => {
  if (config.env == "test") return
  console.log("listening on *:" + config.app.port)
})
