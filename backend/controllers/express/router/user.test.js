const chance = require("chance")()

var RoutesForTests = require("./routes.for.tests.js")

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
