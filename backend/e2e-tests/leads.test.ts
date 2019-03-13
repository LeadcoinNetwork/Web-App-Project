import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

import Leads from "../models/leads/leads"
import { Lead } from "../models/leads/types"

import * as _ from "lodash"

const mock_lead = (overload = {}): Lead => {
  return _.merge(
    Leads.getMockLead(),
    {
      agree_to_terms: true,
    },
    overload,
  )
}

let { appLogic, ApiForToken } = RoutesForTests.create()

beforeEach(async () => await appLogic.models.leads.deleteAll())

test("user adds lead and see it as his lead for sale", async () => {
  let { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()

  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token).leads.sellLeadsGetList({})
  expect(body.list.length).toBe(1)
  expect(body.list[0].ownerId).toBe(user.id)
})

test("when adding leads currency should be removed from the price", async () => {
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = mock_lead({
    lead_price: "10$",
  })

  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token).leads.sellLeadsGetList({})
  expect(body.list[0].lead_price).toBe(10)

  //@ts-ignore, cuz $20 is not a number
  lead.lead_price = "$20"
  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body2 = await ApiForToken(token).leads.sellLeadsGetList({})
  let last = _.last(_.sortBy(body2.list, "id"))
  expect(last.lead_price).toBe(20)
})

test(`
  User adds lead, 
  User2 buys it, 
  User1 balance is increased 
  User2 balance is decreased
  both get notifications`, async () => {
  let { user: user1_1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let { user: user2_1, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead({
    lead_price: 10,
  })

  // add lead for user 1
  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)

  // get lead as user2
  let body = await ApiForToken(token2).leads.buyLeadsGetList()
  let [old_record] = body.list

  // buy lead as user 2
  await ApiForToken(token2).leads.buyLeadsBuy([old_record.id])

  // check notifications as user1
  let n = await ApiForToken(token1).notifications.getNotifications()
  expect(n.list.length).toBe(1)

  // check balance
  let { user: user1_2 } = await ApiForToken(token1).users.getMe()
  let { user: user2_2 } = await ApiForToken(token2).users.getMe()
  expect(user1_2.balance).toBe(user1_1.balance + lead.lead_price)
  expect(user2_2.balance).toBe(user2_1.balance - lead.lead_price)
})

test("1st user adds lead, 2nd user buys it, everything should work", async () => {
  let { user: user1, token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let { user: user2, token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.buyLeadsGetList()
  expect(body.error).toBeFalsy()
  expect(body.list.length).toBe(1)
  let [old_record] = body.list
  expect(old_record.ownerId).toBe(user1.id)
  await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getMyLeads({})
  expect(body.list.length).toBe(1)
  let [new_record] = body.list
  expect(new_record.ownerId).toBe(user2.id)
  expect(new_record.comments).toBe(lead.comments)
  expect(new_record.forSale).toBeFalsy()
})

test("getting all leads should work", async () => {
  let { token: token1 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let { token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = mock_lead({
    comments: "testlead 1",
  })

  const lead2 = mock_lead({
    comments: "unique",
  })

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.buyLeadsGetList()
  expect(body.total).toBe(1)
  expect(body.error).toBeFalsy()
  expect(typeof body.list).toEqual("object")

  await ApiForToken(token1).leads.sellLeadsAddByForm(lead2)

  body = await ApiForToken(token2).leads.buyLeadsGetList({
    filter: {
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
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let { token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead({
    lead_price: 999999999,
  })
  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.buyLeadsGetList()

  let body2 = await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  expect(body2.error).toBeTruthy()
  expect(body2.error.balance[0]).toBe("Amount insufficient.")
})

test(`user1 add a lead
      user2 buys it 
      user2 move it for sale 
      user1 buys it back, for symetry`, async () => {
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let { token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()
  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.buyLeadsGetList()
  await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getMyLeads({})
  const [record] = body.list
  body = await ApiForToken(token2).leads.myLeadsMoveToSell([body.list[0].id])
  expect(body.error).toBeFalsy()
  expect(record.comments).toBe(lead.comments)
})

test("user1 add lead, user2 buys it and then he sees it as his lead under /my-leads", async () => {
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let { token: token2 } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  const lead = mock_lead()
  await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  let body = await ApiForToken(token2).leads.buyLeadsGetList()
  await ApiForToken(token2).leads.buyLeadsBuy([body.list[0].id])
  body = await ApiForToken(token2).leads.getMyLeads({})
  expect(body.error).toBeFalsy()
  const [record] = body.list
  expect(record.comments).toBe(lead.comments)
})

test("getting my leads at order should work", async () => {
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })
  let body
  const lead = mock_lead({
    comments: "testlead1",
    telephone: "0001",
  })
  const lead2 = mock_lead({
    comments: "testlead2",
    telephone: "0002",
  })

  body = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(body.error).toBeFalsy()

  body = await ApiForToken(token).leads.sellLeadsAddByForm(lead2)
  expect(body.error).toBeFalsy()

  // get leads ordered by date, order should be [lead2, lead]
  body = await ApiForToken(token).leads.sellLeadsGetList({
    page: 0,
    limit: 5,
    sortBy: "comments",
  })
  expect(body.error).toBeFalsy()
  const [record1, record2] = body.list
  expect(record1.comments).toBe(lead2.comments)
  expect(record2.comments).toBe(lead.comments)

  // get leads ordered by telephone, order should be [lead2, lead]
  body = await ApiForToken(token).leads.sellLeadsGetList({
    page: 0,
    limit: 5,
    sortBy: "telephone",
  })
  expect(body.error).toBeFalsy()
  const [record3, record4] = body.list
  expect(record4.comments).toBe(lead.comments)
  expect(record3.comments).toBe(lead2.comments)

  body = await ApiForToken(token).leads.sellLeadsGetList({
    page: 0,
    limit: 1,
    sortBy: "telephone",
  })
  expect(body.list.length).toBe(1)
})

test("adding a lead without contact info should fail", async () => {
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = mock_lead({
    email: null,
    telephone: null,
    contact_person: null,
  })
  let result = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(result.error).toBeTruthy()
})

test("adding a lead should fail without token", async () => {
  const lead = mock_lead()
  let result = await ApiForToken(" ").leads.sellLeadsAddByForm(lead)
  expect(result.error).toBeTruthy()
})

test("adding a lead should success with data A", async () => {
  let { token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  const lead = mock_lead()
  let result = await ApiForToken(token).leads.sellLeadsAddByForm(lead)
  expect(result.response.affectedRows).toBeTruthy()
  let body = await ApiForToken(token).leads.sellLeadsGetList({})
  let [record] = body.list
  expect(record.forSale).toBeTruthy()
})
