import Leads from "./leads"
import * as Chance from "chance"
var chance = Chance()
import { Lead } from "./types"
import config from "../../app-logic/config"

import SQL from "../mysql-pool/mysql-pool"
var leads = new Leads(new SQL(config))

beforeEach(async () => {
  await leads.deleteAll()
})

import NotFound from "../../utils/not-found"

test("delete lead - insert, delete and then test cannot find lead after deleted", async () => {
  const status = await leads.insertLead({
    date: 1212,
    ownerId: 1,
    name: "test lead",
    phone: "12301212",
    email: "moshe@moshe.com",
    active: true,
    bought_from: null,
  })
  expect(status.insertId).toBeTruthy()
  const id = status.insertId
  const result = await leads.remove(id)
  const record: Lead = await leads.getById(id)
  expect(record).toBe(undefined)
})

/*
test("add new lead with bad data", async () => {
  const success = await leads.insertLead({
    date: 1414,
    ownerId: 34,
    name: 'test lead',
    phone: '12301212',
    email: 'moshe@moshe.com',
    active: true,
    bought_from: null
  })
  expect(success).toBeFalsey()
})
*/
const add_leads = async count => {
  const rc = []
  for (let i = 1; i < count + 1; i++) {
    let status = await leads.insertLead({
      date: 1212,
      ownerId: i,
      name: chance.name(),
      phone: "12301212",
      email: "moshe@moshe.com",
      active: true,
      price: 0,
      bought_currency: "USD",
      bought_from: null,
    })
    if (status.affectedRows) rc.push(status.insertId)
  }
  return rc
}

test("buying leads should work", async () => {
  const new_ids = await add_leads(10)
  expect(new_ids.length).toBe(10)
  const res = await leads.buy(new_ids, 666)
  const records: Lead[] = await leads.findLeads({
    condition: {
      ownerId: 666,
    },
    limit: {
      start: 0,
      offset: 20,
    },
  })
  expect(records.length).toBe(10)
  expect(records.pop().ownerId).toBe(666)
})

test("paging and limit should work", async () => {
  const done = await add_leads(50)
  expect(done.length).toBeTruthy()
  const records1: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
    limit: {
      start: 0,
      offset: 20,
    },
  })
  expect(records1.length).toBe(20)
  expect(records1.pop().ownerId).toBe(20)
  const records2: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
    limit: {
      start: 20,
      offset: 20,
    },
  })
  expect(records2.length).toBe(20)
  expect(records2.pop().ownerId).toBe(40)
  const records3: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
    limit: {
      start: 40,
      offset: 20,
    },
  })
  expect(records3.length).toBe(10)
  expect(records3.pop().ownerId).toBe(50)
})

test("add new lead", async () => {
  const success = await leads.insertLead({
    date: 1212,
    ownerId: 1,
    name: "test lead",
    phone: "12301212",
    email: "moshe@moshe.com",
    active: true,
    bought_from: null,
  })
  expect(success).toBeTruthy()
})

test("find lead", async () => {
  await leads.insertLead({
    date: 1212,
    bought_currency: "USD",
    price: 0,
    ownerId: 1,
    name: "test lead",
    active: true,
    phone: "1",
    email: "moshe@moshe.com",
    bought_from: null,
  })
  const [record]: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
  })
  expect(record.email).toBe("moshe@moshe.com")
  await leads.insertLead({
    date: 1213,
    bought_currency: "USD",
    price: 0,
    ownerId: 1,
    name: "test lead 2",
    active: true,
    phone: "2",
    email: "moshe@moshe.com",
    bought_from: null,
  })
  const [record3, record4]: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
    sort: {
      sortBy: "phone",
      sortOrder: "DESC",
    },
  })
  expect(record3.name).toBe("test lead 2")
  expect(record4.name).toBe("test lead")
  const [record5, record6]: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
    sort: {
      sortBy: "phone",
      sortOrder: "ASC",
    },
  })
  expect(record6.name).toBe("test lead 2")
  expect(record5.name).toBe("test lead")
})

test("delete lead", async () => {
  await leads.insertLead({
    date: 1212,
    ownerId: 1,
    active: true,
    name: "test lead",
    phone: "12301212",
    email: "moshe@moshe.com",
    bought_from: null,
  })
  const [record]: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
    },
  })
  const { id } = record
  await leads.remove(id)
  const [record2]: Lead[] = await leads.findLeads({
    condition: {
      email: "moshe@moshe.com",
      active: true,
    },
  })
  expect(record2).toBe(undefined)
})
