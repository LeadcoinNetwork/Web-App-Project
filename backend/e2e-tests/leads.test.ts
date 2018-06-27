import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request } = RoutesForTests.create()

test("adding a lead should fail unless contains required fields and succeed otherwise", async () => {
  var { user, token } = await ValidatedUserForTests.create({ request })
  var x = await request.post("/leads/add").set({
    cookie: "token=" + token,
  }).send({
    lead: {
      name: 'erez'
    }
  })
  console.log(x)
}
)
