import * as Chance from "chance"
import * as _ from "lodash"

import API from "../../frontend/src/api/index"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request, appLogic } = RoutesForTests.create()
var api = new API(request)

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
    active: true,
    bought_from: user.id,
  }
  const { affectedRows, insertId } = await appLogic.models.leads.insertLead(
    lead,
  )
  expect(affectedRows).toBeTruthy()
  const res = await request
    .get("/leads/sold")
    .set({
      cookie: "token=" + token,
    })
    .send({
      filters: [["name", "testlead"]],
    })
  expect(res.error).toBeFalsy()
  const [record] = res.body.list
  expect(record.id).toBe(insertId)
})

test("getting all leads should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    bought_from: 5,
  }

  const result = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead })

  const res = await request
    .get("/leads/all")
    .set({
      cookie: "token=" + token,
    })
    .send({
      filters: [["name", "testlead"]],
    })
  expect(res.error).toBeFalsy()
  const [record] = res.body.list
  expect(record).toBeTruthy()
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
    active: true,
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
      filters: [["name", "testlead"]],
    })
  expect(res.error).toBeFalsy()
  const [record] = res.body.list
  expect(record.name).toBe(lead.name)
})

test("getting my leads at order should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    active: true,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    bought_from: null,
  }
  const lead2 = {
    date: 1214,
    active: true,
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
      sort: {
        sortBy: "date",
        sortOrder: "ASC",
      },
      filters: [],
    })
  expect(res.error).toBeFalsy()
  const [record1, record2] = res.body.list
  expect(record1.name).toBe(lead.name)
  expect(record2.name).toBe(lead2.name)
  const res2 = await request
    .get("/leads/my")
    .set({
      cookie: "token=" + token,
    })
    .send({
      sort: {
        sortBy: "date",
        sortOrder: "DESC",
      },
      filters: [],
    })
  expect(res2.error).toBeFalsy()
  const [record3, record4] = res.body.list
  expect(record3.name).toBe(lead.name)
  expect(record4.name).toBe(lead2.name)
})

test("adding a bad lead should return error to client", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 2929, // this date will be invalid on mysql server
    name: "test lead that should fail 100%",
    phone: "2",
    email: "",
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

test("adding a lead should fail without email", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = {
    date: 1213,
    name: "test lead that should fail 100%",
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
  expect(result.body.error).toBe("email not valid")
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
  const results = await request.post("/leads/add").send({ lead })
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
    owner_id: 3,
  }
  const result = await request
    .post("/leads/add")
    .set({
      cookie: "token=" + token,
    })
    .send({ lead })
  const { affectedRows, insertId } = result.body.response
  expect(affectedRows).toBeTruthy()
})
