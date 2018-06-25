const express = require("express")
const supertest = require("supertest")
// Internal Modules
import UserActions from "../../models/users/users"
import EmailCreator from "../../models/email-creator/email-creator"
import EmailSenderMock from "../../models/emailsender/mock"

import AppLogic from "../../app-logic/index"
export function create() {
  var emailSenderMock = new EmailSenderMock()
  var appLogic = new AppLogic({
    emailSender: emailSenderMock,
    emailCreator: new EmailCreator({
      backend: "https://testbackend.com",
      from: "me@me.com",
    }),
  })

  var app = appLogic.createServer()

  var request = supertest(app)

  return { request, emailSenderMock }
}
