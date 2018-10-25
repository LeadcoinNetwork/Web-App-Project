import * as Chance from "chance"
import * as _ from "lodash"

const chance = Chance()
import API from "../../frontend/src/api/index"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"
import { Lead, Industry, Categories } from "../models/leads/types"
const mock_lead = (overload = {}): Lead => {
  return Object.assign(
    {
      Industry: "Real Estate" as Industry,
      Category: "Sell" as Categories,
      date: new Date().valueOf(),
      Description: chance.sentence({
        words: chance.integer({ min: 1, max: 9 }),
      }),
      State: chance.state(),
      Location: "124 Market St.",
      "Housing Type": "Cardboard Box",
      Size: chance.integer({ min: 1, max: 20 }),
      "Bedrooms/Baths": "2BR / 2BA",
      "Contact Person": chance.name(),
      Telephone: chance.phone(),
      Email: chance.email(),
      bought_from: null,
      forSale: true,
      agree_to_terms: true,
      ownerId: 0,
      active: true,
      lead_price: 10,
      Price: parseInt(
        chance
          .integer()
          .toString()
          .substring(0, 7)
          .slice(1, -1),
      ),
    },
    overload,
  )
}

var { request, appLogic, ApiForToken } = RoutesForTests.create()

beforeEach(async () => {
  await appLogic.models.leads.deleteAll()
})

test.skip("getting my sold_leads should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead({
    bought_from: user.id,
  })
  const { insertId } = await appLogic.models.leads.insertLead(lead)
  expect(insertId).toBeTruthy()
  //body = await ApiForToken(token2).leads.buyLeadsBuy([insertId])

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
  const lead = mock_lead({})

  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token).leads.getLeadsList("/sell-leads", {})
  expect(body.list.length).toBe(1)
  expect(body.list[0].ownerId).toBe(user.id)
})

test("when adding leads currency should be removed from the price", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead({
    lead_price: "10$",
  })

  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token).leads.getLeadsList("/sell-leads", {})
  expect(body.list[0].lead_price).toBe(10)
  //@ts-ignore, cuz $20 is not a number
  lead.lead_price = "$20"
  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body2 = await ApiForToken(token).leads.getLeadsList("/sell-leads", {})
  expect(body2.list[1].lead_price).toBe(20)
})

test(`
  User adds lead, 
  User2 buys it, 
  User1 balance is increased 
  User2 balance is decreased
  both get notifications`, async () => {
  var { user: user1_1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2_1, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead({
    lead_price: 10,
  })

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {})
  let [old_record] = body.list
  body = await ApiForToken(token2).leads.buyLeadsBuy([old_record.id])
  let n = await ApiForToken(token1).notifications.getNotifications()
  expect(n.list.length).toBe(1)
  let { user: user1_2 } = await ApiForToken(token1).users.getMe()
  let { user: user2_2 } = await ApiForToken(token2).users.getMe()
  expect(user1_2.balance).toBe(user1_1.balance + lead.Price)
  expect(user2_2.balance).toBe(user2_1.balance - lead.Price)
})

test("1st user adds lead, 2nd user buys it, everything should work", async () => {
  var { user: user1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {})
  expect(body.error).toBeFalsy()
  expect(body.list.length).toBe(1)
  let [old_record] = body.list
  expect(old_record.ownerId).toBe(user1.id)
  body = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getLeadsList("/my-leads", {})
  expect(body.list.length).toBe(1)
  let [new_record] = body.list
  expect(new_record.ownerId).toBe(user2.id)
  expect(new_record.description).toBe(lead.Description)
  expect(new_record.forSale).toBeFalsy()
})

test("getting all leads should work", async () => {
  var { user: user1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = mock_lead({
    name: "testlead 1",
  })

  const lead2 = mock_lead({
    name: "unique",
  })

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  var body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {})
  expect(body.total).toBe(1)
  expect(body.error).toBeFalsy()
  expect(typeof body.list).toEqual("object")

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead2)

  var body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {
    filter: {
      industry: "Real Estate",
      industryFilters: undefined,
      search: "unique",
    },
  })
  expect(body.total).toBe(1)
  expect(body.error).toBeFalsy()
  expect(typeof body.list).toEqual("object")
})

test(`user1 add a lead
      user2 tries to buys it but fails because he has no money
      user2 dies alone, homeless and poor`, async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead({
    lead_price: 999999999,
  })
  let body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {})
  let body2 = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  expect(body2.error).toBeTruthy()
  expect(body2.error).toBe("balance::amount insufficient")
})

test(`user1 add a lead
      user2 buys it 
      user2 move it for sale 
      user1 buys it back, for symetry`, async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()
  let body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {})
  body = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getLeadsList("/my-leads", {})
  const [record] = body.list
  body = await ApiForToken(token2).leads.myLeadsMoveToSell([body.list[0].id])
  expect(body.error).toBeFalsy()
  expect(record.description).toBe(lead.Description)
})

test("user1 add lead, user2 buys it and then he sees it as his lead under /my-leads", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  var { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()
  let body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  body = await ApiForToken(token2).leads.getLeadsList("/buy-leads", {})
  body = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getLeadsList("/my-leads", {})
  expect(body.error).toBeFalsy()
  const [record] = body.list
  expect(record.description).toBe(lead.Description)
})

test("getting my leads at order should work", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let body
  const lead = mock_lead({
    Description: "testlead1",
    Telephone: "0001",
  })
  const lead2 = mock_lead({
    Description: "testlead2",
    Telephone: "0002",
  })

  body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(body.error).toBeFalsy()

  body = await ApiForToken(token).leads.sellLeadsAddByForm(lead2)
  expect(body.error).toBeFalsy()

  // get leads ordered by date, order should be [lead2, lead]
  body = await ApiForToken(token).leads.getLeadsList("/buy-leads", {
    page: 0,
    limit: 5,
    sortBy: "Description",
  })
  expect(body.error).toBeFalsy()
  const [record1, record2] = body.list
  expect(record1.Description).toBe(lead2.Description)
  expect(record2.Description).toBe(lead.Description)

  // get leads ordered by phone, order should be [lead2, lead]
  body = await ApiForToken(token).leads.getLeadsList("/buy-leads", {
    page: 0,
    limit: 5,
    sortBy: "Telephone",
  })
  expect(body.error).toBeFalsy()
  const [record3, record4] = body.list
  expect(record4.Description).toBe(lead.Description)
  expect(record3.Description).toBe(lead2.Description)

  body = await ApiForToken(token).leads.getLeadsList("/buy-leads", {
    page: 0,
    limit: 1,
    sortBy: "Telephone",
  })
  expect(body.list.length).toBe(1)
})

test("adding a lead should fail without email", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = mock_lead({
    description: " ",
  })
  let result = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(result.error).toBeTruthy()
  const error_json = JSON.parse(result.error)
  expect(error_json.description[0]).toBe("too short")
})

test("adding a lead should fail without token", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()
  let result = await ApiForToken(" ").leads.sellLeadsAddByForm(lead)
  expect(result.error).toBeTruthy()
})

test("adding a lead should success with data A", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()
  let result = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(result.response.affectedRows).toBeTruthy()
  let body = await ApiForToken(token).leads.getLeadsList("/buy-leads", {})
  let [record] = body.list
  expect(record.forSale).toBeTruthy()
})
