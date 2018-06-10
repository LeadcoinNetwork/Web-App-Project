const config = require("../../../app/config")
const { mysqlPool } = require("../../../app/mysql")
const User = require("../../../app/controller/user")
const { Token } = require("../../../app/model")
const expect = require("chai").expect
const { testUser } = require("../util")

const request = require("request-promise-native").defaults({
  baseUrl: config.backend,
  resolveWithFullResponse: true
})

describe(`Update ${config.backend}/user`, () => {
  it("Should update the user", async () => {
    // first, add a user
    var user = await User.register(testUser)
    var [{ token }] = await Token.find({ user_id: user.id })
    var user = await User.confirmEmail(token)
    var token = await User.login(user.id)

    const updUser = {
      fname: "Alex",
      lname: "Bora",
      email: testUser.email,
      password: "912379231",
      role: "admin"
    }

    const res = await request.put(`/user/${user.id}`, {
      auth: { bearer: token },
      json: updUser
    })

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body))
    expect(res.body).to.include({
      fname: updUser.fname,
      lname: updUser.lname,
      email: updUser.email,
      role: "admin"
    })
  })
})
