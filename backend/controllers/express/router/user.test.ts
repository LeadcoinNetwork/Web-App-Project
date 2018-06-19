const chance = require("chance")()

import * as RoutesForTests from "./routes.for.tests"

var _ = require("lodash")
var { request, mockMailSender } = RoutesForTests.create()

test("POST /user sign up using username and password [not yet implemented]", async () => {
  return request
    .post("/user", {
      firstname: "moshe",
    })
    .then(x => {
      var expected =
        '"First name" is required; "Last name" is required; "Email" is required; "Password" is required'
      var actual = JSON.parse(x.error.text).error
      expect(actual).toEqual(expected)
      expect(x.status).toEqual(400)
    })
})

test.only("GET /me sign up using username and password [not yet implemented]", async () => {
  var fname = chance.first()
  var lname = chance.last()
  var x = await request.post("/user").send({
    fname,
    lname,
    password: "KGHasdF987654&*^%$#",
    email: chance.email(),
  })
  expect(x.status).toEqual(201)
  var tokenFromBody = x.body.token
  var TokenCookie = _.get(x, _.toPath("header['set-cookie'][0]"))
  expect(TokenCookie).toBeTruthy()
  var tokenFromCookie = TokenCookie.replace(/token=(.*?);.*/, "$1")

  // Both tokens are equals
  expect(tokenFromBody).toEqual(tokenFromCookie)
  var y = require("./candelete")
  y.great()
  // Tokens are secured and not empty
  expect(tokenFromBody.length).toBeGreaterThan(10)

  var x = await request.get("/me").set({
    cookie: "token=" + tokenFromBody,
  })
  expect(_.get(x, "error.text")).toBeFalsy()
  expect(_.get(x, "body.user.fname")).toBe(fname)
  return true
})
