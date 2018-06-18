const express = require("express")
const supertest = require("supertest")
// Internal Modules
const Routes = require("./index")
const User = require("../../../models/user/user")
const Email = require("../../../models/email/email")

module.exports.create = function() {
  var app = express()
  var request = supertest(app)
  var mockMailSender = jest.fn()
  var email = new Email({
    mailSender: { send: mockMailSender },
    backend: "testbackend.com",
    from: "noreplay@testbackend.com",
  })
  Routes.start({
    app,
    frontend: "http://mybackendintest.com",
    email,
    user: new User({
      email,
    }),
  })

  return { request, mockMailSender }
}
