import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils-tests/routes.for.tests"
import * as ValidatedUserForTests from "./utils-tests/user.for.tests"

var { request, emailSenderMock } = RoutesForTests.create()

test("upload CSV that contain only 1 row", async () => {
  var user = await ValidatedUserForTests.create({ request })
  console.log("great:", user.id)
})
