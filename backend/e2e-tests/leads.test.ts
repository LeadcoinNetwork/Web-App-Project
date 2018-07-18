import * as Chance from "chance"
import * as _ from "lodash"

import API from "../../frontend/src/api/index"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request, appLogic, ApiForToken } = RoutesForTests.create()

beforeEach(async () => {
  await appLogic.models.leads.deleteAll()
})

test.skip("getting my sold_leads should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 8",
    phone: "2",
    email: "moshe@moshe.com",
    ownerId: 123,
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

test("user adds lead and see it as his lead for sale", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    price: 12,
    currency: "USD",
    bought_from: 0,
  }

  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token).leads.sellLeadsGetList({})
  expect(body.list.length).toBe(1)
  expect(body.list[0].ownerId).toBe(user.id)
})

test("1st user adds lead, 2nd user buys it, everything should work", async () => {
  var { user: user1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    price: 12,
    ownerId: 50,
    currency: "USD",
    bought_from: 0,
  }

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.buyLeadsGetList()
  expect(body.error).toBeFalsy()
  expect(body.list.length).toBe(1)
  let [old_record] = body.list
  expect(old_record.ownerId).toBe(user1.id)
  body = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.buyLeadsGetList()
  let [new_record] = body.list
  expect(new_record.ownerId).toBe(user2.id)
  expect(new_record.name).toBe(lead.name)
})

test("getting all leads should work", async () => {
  var { user: user1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    price: 12,
    ownerId: 50,
    currency: "USD",
    bought_from: 5,
  }

  const lead2 = {
    date: 1213,
    name: "unique",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    price: 12,
    ownerId: 50,
    currency: "USD",
    bought_from: 5,
  }

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  var body = await ApiForToken(token2).leads.buyLeadsGetList()
  expect(body.total).toBe(1)
  expect(body.error).toBeFalsy()
  expect(typeof body.list).toEqual("object")

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead2)

  var body = await ApiForToken(token2).leads.buyLeadsGetList({
    search: "unique",
  })
  expect(body.total).toBe(1)
  expect(body.error).toBeFalsy()
  expect(typeof body.list).toEqual("object")
})

test("getting my bought_leads should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead for my-leads",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    bought_from: 5,
  }
  let body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  body = await ApiForToken(token2).leads.buyLeadsGetList()
  body = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getMyLeads({})
  expect(body.error).toBeFalsy()
  const [record] = body.list
  expect(record.name).toBe(lead.name)
})

test("getting my leads at order should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let body
  const lead = {
    date: 1213,
    active: true,
    name: "testlead1",
    phone: "0001",
    email: "moshe@moshe.com",
    bought_from: null,
  }
  const lead2 = {
    date: 1214,
    active: true,
    name: "testlead2",
    phone: "0002",
    email: "moshe@moshe.com",
    bought_from: null,
  }

  body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(body.error).toBeFalsy()

  body = await ApiForToken(token).leads.sellLeadsAddByForm(lead2)
  expect(body.error).toBeFalsy()

  // get leads ordered by date, order should be [lead2, lead]
  body = await ApiForToken(token).leads.buyLeadsGetList({
    page: 0,
    limit: 5,
  })
  expect(body.error).toBeFalsy()
  const [record1, record2] = body.list
  expect(record1.name).toBe(lead2.name)
  expect(record2.name).toBe(lead.name)

  // get leads ordered by phone, order should be [lead2, lead]
  body = await ApiForToken(token).leads.buyLeadsGetList({
    page: 0,
    limit: 5,
    sortBy: "phone",
  })
  expect(body.error).toBeFalsy()
  const [record3, record4] = body.list
  expect(record4.name).toBe(lead.name)
  expect(record3.name).toBe(lead2.name)

  body = await ApiForToken(token).leads.buyLeadsGetList({
    page: 0,
    limit: 1,
    sortBy: "phone",
  })
  expect(body.list.length).toBe(1)
})

test("adding a lead should fail without email", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "",
    active: true,
    price: 12,
    ownerId: 50,
    currency: "ils",
    bought_from: 5,
  }
  let result = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(result.error).toBeTruthy()
  expect(result.error).toBe("email not valid")
})

test("adding a lead should fail without token", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    price: 12,
    ownerId: 50,
    currency: "ils",
    bought_from: 5,
  }
  let result = await ApiForToken(" ").leads.sellLeadsAddByForm(lead)
  expect(result.error).toBeTruthy()
})

test("adding a lead should success with data A", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = {
    date: 1213,
    name: "testlead 1",
    phone: "2",
    email: "moshe@moshe.com",
    active: true,
    price: 12,
    ownerId: 50,
    currency: "ils",
    bought_from: 5,
  }
  let result = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(result.response.affectedRows).toBeTruthy()
})
