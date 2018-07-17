const express = require("express")
const supertest = require("supertest")
// Internal Modules
import EmailCreator from "../../models/email-creator/email-creator"
import EmailSenderMock from "../../models/emailsender/mock"
import * as superagent from "superagent"
import API from "../../../frontend/src/api/index"
import * as _ from "lodash"

import AppLogic from "../../app-logic/index"
interface IcreateProps {
  realEmail?: boolean
}
export function create({ realEmail = false }: IcreateProps = {}) {
  var emailSenderMock = new EmailSenderMock()

  var appLogic = new AppLogic({
    emailSender: realEmail ? undefined : emailSenderMock,
    emailCreator: new EmailCreator({
      backend: "https://testbackend.com",
      from: "me@me.com",
    }),
  })

  var app = appLogic.createServer()

  var request = supertest(app)

  var ApiForToken = function(token) {
    function newRequest(method, url, body, query) {
      return request[method](url)
        .set("Cookie", "token=" + token)
        .query(query)
        .send(body)
    }
    return new API(newRequest)
  }

  return { ApiForToken, request, emailSenderMock, appLogic }
}
