const express = require("express")
const supertest = require("supertest")
// Internal Modules
import * as Routes from "../index"
import UserActions from "../../../../models/user-actions/user-actions"
import EmailCreator from "../../../../models/email-creator/email-creator"
import EmailSenderMock from "../../../../models/emailsender/mock"

export function create() {
  var app = express()
  var request = supertest(app)

  var emailCreator = new EmailCreator({
    backend: "https://testbackend.com",
    from: "me@me.com",
  })
  var emailSenderMock = new EmailSenderMock()
  Routes.start({
    app,
    frontend: "http://mybackendintest.com",
    emailCreator: emailCreator,
    emailSender: emailSenderMock,
    userActions: new UserActions({
      emailSender: emailSenderMock,
      emailCreator,
    }),
  })

  return { request, emailSenderMock }
}
