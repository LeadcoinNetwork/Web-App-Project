import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request } = RoutesForTests.create()

test("upload CSV that contain only 1 row", async () => {
  var { user, token } = await ValidatedUserForTests.create({ request })
})
