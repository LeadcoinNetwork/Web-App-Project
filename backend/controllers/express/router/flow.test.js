const chance = require("chance")()
var RoutesForTests = require("./routes.for.tests.js")

var { request, mockMailSender } = RoutesForTests.create()

test("user sign-up, click link, upload lead. user 2, sign-up, click link, buy lead", async () => {
  var x = await request.post("/user").send({
    fname: "moshe",
    lname: "moshe",
    password: "KGHasdF987654&*^%$#",
    email: chance.email(),
  })
  expect(x.status).toEqual(201)
  var lastCall = mockMailSender.mock.calls.pop()
  var html = lastCall[0].html
  var linkMatch = html.match(/href="(.*?)"/)
  expect(linkMatch).toHaveLength(2)
  var link = linkMatch[1]
  console.log(link)
})
