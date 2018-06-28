import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request, appLogic } = RoutesForTests.create()

//test("adding a lead should fail without valid parameters A", async () => {})
test("adding a lead should fail without valid parameters B", async () => {
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
  const result = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead })
  expect(result.error).toBeTruthy()
})

test("adding a lead should fail without token", async () => {
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
  const results = await request
    .post("/leads/add")
    .send({ lead })
  expect(results.error).toBeTruthy()
})

test("adding a lead should success with data A", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "test lead 2",
    phone: "2",
    email: "moshe@moshe.com",
    bought_from: null,
    owner_id: 3
  }
  const result = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead })
  const [done, insertId] = result.body.response
  expect(done).toBeTruthy()
})