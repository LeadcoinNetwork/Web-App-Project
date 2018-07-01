import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
import NotFound from "../utils/not-found"
import { disabledReason } from "../models/users/types"

var {
  ApiForToken,
  request,
  emailSenderMock,
  appLogic,
} = RoutesForTests.create()

var chance = Chance()

beforeAll(() => {
  appLogic.models.users.deleteAll()
})

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

describe("POST /user is sending emails that contain the right link", () => {
  test("using mock email provider", async () => {
    // We create routes here. Because we need to use the emailSenderMock
    var { request, emailSenderMock, appLogic } = RoutesForTests.create()
    var fname = chance.first()
    var lname = chance.last()
    var x = await request.post("/user").send({
      fname,
      lname,
      password: "KGHasdF987654&*^%$#",
      email: chance.email(),
    })
    var userid = x.body.user
    expect(typeof userid).toEqual("number")

    var user = await appLogic.models.users.mustGetUserById(userid)
    var key = user.emailConfirmationKey
    var emailHTML = emailSenderMock.lastCall().html
    expect(emailHTML).toMatch("/auth/confirm-email-update?key=" + key)
  })

  test.skip("using real email provider", async () => {
    // We create routes here. Because we need to use the emailSenderMock

    var { request, emailSenderMock, appLogic } = RoutesForTests.create({
      realEmail: true,
    })

    var fname = chance.first()
    var lname = chance.last()
    var x = await request.post("/user").send({
      fname,
      lname,
      password: "KGHasdF987654&*^%$#",
      email: "aminadav@leadcoin.network",
    })
    expect(x.error).toBeFalsy()
    var userid = x.body.user
    expect(typeof userid).toEqual("number")

    var user = await appLogic.models.users.mustGetUserById(userid)
    var key = user.emailConfirmationKey
    // var emailHTML = emailSenderMock.lastCall().html
    // expect(emailHTML).toMatch("/auth/confirm-email-update?key=" + key)
  })
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

test("activateUserByKey (ensure that is disabled before)", async () => {
  const fname = chance.first()
  const lname = chance.last()
  const email = chance.email()
  var x = await request.post("/user").send({
    fname,
    lname,
    password: "KGHasdF987654&*^%$#",
    email,
  })

  var TokenCookie = _.get(x, _.toPath("header['set-cookie'][0]"))
  var tokenFromCookie = TokenCookie.replace(/token=(.*?);.*/, "$1")

  var x = await request.get("/me").set({
    cookie: "token=" + tokenFromCookie,
  })
  expect(x.body.user.disabled).toEqual("EMAIL_NOT_VERIFIED")

  var user = await appLogic.models.users.mustGetUserById(x.body.user.id)

  var j = await request.get("/auth/confirm-email-update").query({
    key: "aasdads",
  })
  expect(j.error).toBeTruthy()

  var y = await request.get("/auth/confirm-email-update").query({
    key: user.emailConfirmationKey,
  })
  expect(y.headers.location).toMatch("/")
  expect(y.headers["set-cookie"][0]).toMatch("token")

  var user = await appLogic.models.users.mustGetUserById(x.body.user.id)
  expect(user.disabled).toBe(disabledReason.PROFILE_NOT_COMPLETED)
})

describe("/complete-profile", () => {
  test("using invalid date (no phone) should not update database, and set disabled as null", async () => {
    var { users } = appLogic.models
    var user = await users.createUser({
      disabled: disabledReason.PROFILE_NOT_COMPLETED,
      fname: "fname",
      lname: "df",
      email: chance.email(),
    })
    var token = await users.generateJWT(user, appLogic.config.auth.jwt.secret)
    var x = await request
      .post("/complete-profile")
      .set({ cookie: "token=" + token })
      .send({
        company: "abc",
        country: "Israel",
      })
    expect(x.error).toBeTruthy()
    var newUser = await users.mustGetUserById(user)
    expect(newUser.disabled).toBeTruthy()
  })
  test("should update databse, and set disabled as null", async () => {
    var { users } = appLogic.models
    var user = await users.createUser({
      disabled: disabledReason.PROFILE_NOT_COMPLETED,
      fname: "fname",
      lname: "df",
      email: chance.email(),
    })
    var token = await users.generateJWT(user, appLogic.config.auth.jwt.secret)
    var x = await request
      .post("/complete-profile")
      .set({ cookie: "token=" + token })
      .send({
        company: "abc",
        phone: "+32223132",
        country: "Israel",
      })
    expect(x.error).toBeFalsy()

    var newUser = await users.mustGetUserById(user)
    expect(newUser.disabled).toBeFalsy()
    expect(newUser.company).toEqual("abc")
    expect(newUser.phone).toEqual("+32223132")
    expect(newUser.country).toEqual("Israel")
  })
})

test("test logout", async () => {
  var { users } = appLogic.models
  var user = await users.createUser({
    disabled: disabledReason.PROFILE_NOT_COMPLETED,
    fname: "fname",
    lname: "df",
    email: chance.email(),
  })
  var token = await users.generateJWT(user, appLogic.config.auth.jwt.secret)
  var me = await ApiForToken(token).users.getMe()
})
