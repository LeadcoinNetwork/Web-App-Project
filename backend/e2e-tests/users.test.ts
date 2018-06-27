import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
var { request, emailSenderMock } = RoutesForTests.create()

var chance = Chance()

test("POST /user sign up using WRONG username and password", async () => {
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

test("POST /user sign up using REAL username and password", async () => {
  var fname = chance.first()
  var lname = chance.last()
  var x = await request.post("/user").send({
    fname,
    lname,
    password: "KGHasdF987654&*^%$#",
    email: chance.email(),
  })
  expect(typeof x.body.user).toEqual("number")
})

test("GET /me sign up using real username and password", async () => {
  var fname = chance.first()
  var lname = chance.last()
  var x = await request.post("/user").send({
    fname,
    lname,
    password: "KGHasdF987654&*^%$#",
    email: chance.email(),
  })
  expect(x.error).toBeFalsy()

  expect(x.status).toEqual(201)
  var tokenFromBody = x.body.token
  var TokenCookie = _.get(x, _.toPath("header['set-cookie'][0]"))
  expect(TokenCookie).toBeTruthy()
  var tokenFromCookie = TokenCookie.replace(/token=(.*?);.*/, "$1")

  // Both tokens are equals
  expect(tokenFromBody).toEqual(tokenFromCookie)

  // Tokens are secured and not empty
  expect(tokenFromBody.length).toBeGreaterThan(10)

  var x = await request.get("/me").set({
    cookie: "token=" + tokenFromBody,
  })
  expect(_.get(x, "error.text")).toBeFalsy()
  expect(_.get(x, "body.user.fname")).toBe(fname)
})

test("post /auth/login (create user, try login with invalid password, then using valid password, then get me", async () => {
  const fname = chance.first()
  const lname = chance.last()
  const email = chance.email()
  var x = await request.post("/user").send({
    fname,
    lname,
    password: "KGHasdF987654&*^%$#",
    email,
  })
  expect(x.error).toBeFalsy()

  var x = await request.post("/auth/login").send({
    password: "not-valid-password",
    email,
  })
  expect(x.error).toBeTruthy()

  var x = await request.post("/auth/login").send({
    password: "KGHasdF987654&*^%$#",
    email,
  })
  expect(x.error).toBeFalsy()
  var token = x.headers["set-cookie"][0].replace(/token=(.*?);.*/, "$1")
  expect(token).toBeTruthy()
  var x = await request.get("/me").set({
    cookie: "token=" + token,
  })
  expect(x.body.user.fname).toEqual(fname)
})
