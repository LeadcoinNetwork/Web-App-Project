const chance = require("chance")()
var RoutesForTests = require("./routes.for.tests.js")

var { request, mockMailSender } = RoutesForTests.create()

/**
 * Complete Story:
 * User A sign up
 * Click registration link
 * Upload himself (using a form, not a CSV)
 * Upload a CSV (and map the CSV)
 * User B Sign Up
 * User B Registration link
 * User B See list of leads (Check that all leads are found)
 * User B Buy lead
 * User B See the Bought lead in "My Leads"
 * User B Don't see the lead in "Buy Leads"
 * User A
 */
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

/** Complete Story
 * User A Sign UP
 * User A resend link
 * User A active
 * User A change Password
 * User A Logout
 */
