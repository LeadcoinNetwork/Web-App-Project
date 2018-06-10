const expect = require("chai").expect
const { omit } = require("lodash")
const User = require("../../../app/controller/user")
const { Token } = require("../../../app/model")
const config = require("../../../app/config")
const { testUser } = require("../util")

const request = require("request-promise-native").defaults({
  baseUrl: config.backend,
  resolveWithFullResponse: true
})

describe(`Get ${config.backend}/user`, () => {
  it("Should get the user", async () => {
    // first, add a user
    var user = await User.register(testUser)
    var [{ token }] = await Token.find({ user_id: user.id })
    var user = await User.confirmEmail(token)
    var token = await User.login(user.id)

    const res = await request.get(`/user/${user.id}`, {
      auth: { bearer: token },
      json: true
    })

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body))
    expect(omit(res.body, "login")).to.eql(omit(user, "login"))
  })
})
