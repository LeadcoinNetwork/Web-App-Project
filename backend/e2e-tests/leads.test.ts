import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request, appLogic } = RoutesForTests.create()

test("adding a lead should fail unless contains required fields and succeed otherwise", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "test lead 2",
    phone: "2",
    email: "moshe@moshe.com",
    bought_from: null,
  }
  var x = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead })
  console.log(x.error)
})
