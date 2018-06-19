//@ts-check

// External Modules
const express = require("express")

// Internal Modules
const config = require("../../config")
const router = require("./router/index")
const http = require("http")
const io = require("./io/io")
const app = express()

if (config.env === "development") {
  console.log("Allowing orpha/n SSL certificates")
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
}

var httpServer = http.createServer(app)
io.connectToHTTP(httpServer)

import EmailSenderNodeMailer from "../../models/emailsender-nodemailer/emailsender-nodemailer"
import EmailSenderConsole from "../../models/emailsender-console/emailsender-console"

import EmailCreator from "../../models/email-creator/email-creator"
import User from "../../models/user-actions/user-actions"

if (config.mail.mailer == "CONSOLE") {
  var emailSender = new EmailSenderConsole /* {
    host: config.mail.host,
    port: config.mail.port,
    user: config.mail.auth.user,
    pass: config.mail.auth.pass,
  } */()
}

var emailCreator = new EmailCreator({
  backend: config.backend,
  from: config.mail.from,
})

var user = new User({
  emailSender,
  emailCreator,
})

router.start({
  app,
  emailSender,
  emailCreator,
  frontend: config.frontend,
  user,
})

module.exports = httpServer.listen(config.app.port, () => {
  if (config.env == "test") return
  console.log("listening on *:" + config.app.port)
})
