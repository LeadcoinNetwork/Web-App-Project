import * as Chance from "chance"
import * as _ from "lodash"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request, appLogic } = RoutesForTests.create()

test("getting my sold_leads should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 8",
    phone: "2",
    email: "moshe@moshe.com",
    owner_id: 123,
    active: 1,
    bought_from: user.id
  }
  const [success, lead_id] = await appLogic.models.leads.insert(lead)
  expect(success).toBeTruthy()
  const res = await request
    .get("/leads/sold")
    .set({
      cookie: "token=" + token,
    })
    .send({
      filters: [["name", "testlead"]]
    })
  expect(res.error).toBeFalsy()
  const [record] = res.body
  expect(record.id).toBe(lead_id)
})

test("getting my bought_leads should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    bought_from: 5,
  }
  const result = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead })
  const res = await request
    .get("/leads/bought")
    .set({
      cookie: "token=" + token,
    })
    .send({
      filters: [["name", "testlead"]]
    })
  expect(res.error).toBeFalsy()
  const [record] = res.body
  expect(record.name).toBe(lead.name)
})

test("getting my leads at order should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    bought_from: null,
  }
  const lead2 = {
    date: 1214,
    name: "testlead 2",
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
  expect(result.error).toBeFalsy()
  const result2 = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead: lead2 })
  expect(result2.error).toBeFalsy()
  
  const res = await request
    .get("/leads/my")
    .set({
      cookie: "token=" + token,
    })
    .send({
      sort_by: ["date", 'ASC'],
      filters: [["name", "testlead"]]
    })
  expect(res.error).toBeFalsy()
  const [record1, record2] = res.body
  expect(record1.name).toBe(lead.name)
  expect(record2.name).toBe(lead2.name)
  const res2 = await request
    .get("/leads/my")
    .set({
      cookie: "token=" + token,
    })
    .send({
      sort_by: ["date", 'DESC'],
      filters: [["name", "testlead"]]
    })
  expect(res2.error).toBeFalsy()
  const [record3, record4] = res.body
  expect(record3.name).toBe(lead.name)
  expect(record4.name).toBe(lead2.name)
})

test("adding a lead should fail without email", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "test lead 2",
    phone: "2",
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