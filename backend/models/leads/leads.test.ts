
import Leads from "./leads"
import * as Chance from "chance"
import {Lead} from "./types"
import config from "../../app-logic/config"
var chance = Chance()

import SQL from "../mysql-pool/mysql-pool"
var leads = new Leads(new SQL(config))

beforeEach(async () => {
  await leads.deleteAll()
})

import NotFound from "../../utils/not-found"

test("delete lead", async () => {
  const [success, id] = await leads.insert({ 
    date: 1212,
    owner_id: 1,
    name: 'test lead',
    phone: '12301212',
    email: 'moshe@moshe.com',
    active: true,
    bought_from: null
  })
  expect(success).toBeTruthy()
  const result = await leads.remove(id)
  const [record]:Lead[] = await leads.find({id}, {fields: ['id']})
  expect(record).toBe(undefined)
})

/*
test("add new lead with bad data", async () => {
  const success = await leads.insert({ 
    date: 1414,
    owner_id: 34,
    name: 'test lead',
    phone: '12301212',
    email: 'moshe@moshe.com',
    active: true,
    bought_from: null
  })
  expect(success).toBeFalsey()
})
*/
test("add new lead", async () => {
  const success = await leads.insert({ 
    date: 1212,
    owner_id: 1,
    name: 'test lead',
    phone: '12301212',
    email: 'moshe@moshe.com',
    active: true,
    bought_from: null
  })
  expect(success).toBeTruthy()
})

test("find lead", async () => {
  await leads.insert({ 
    date: 1212,
    owner_id: 1,
    name: 'test lead',
    active: true,
    phone: '1',
    email: 'moshe@moshe.com',
    bought_from: null
  })
  const [record]:Lead[] = await leads.find({email: 'moshe@moshe.com'})
  expect(record.email).toBe('moshe@moshe.com')
  const [record2]:Lead[] = await leads.find({email: 'moshe@moshe.com'}, {
    fields: ['email', 'phone']
  })
  expect(record2[name]).toBe(undefined)
  expect(record2.email).toBe('moshe@moshe.com')
  await leads.insert({ 
    date: 1213,
    owner_id: 1,
    name: 'test lead 2',
    active: true,
    phone: '2',
    email: 'moshe@moshe.com',
    bought_from: null
  })
  const [record3, record4]:Lead[] = await leads.find({email: 'moshe@moshe.com'}, {
    sort_by: ['phone', 'DESC']
  })
  expect(record3.name).toBe('test lead 2')
  expect(record4.name).toBe('test lead')
  const [record5, record6]:Lead[] = await leads.find({email: 'moshe@moshe.com'}, {
    sort_by: ['phone', 'ASC']
  })
  expect(record6.name).toBe('test lead 2')
  expect(record5.name).toBe('test lead')
})

test("delete lead", async () => {
  await leads.insert({ 
    date: 1212,
    owner_id: 1,
    active: true,
    name: 'test lead',
    phone: '12301212',
    email: 'moshe@moshe.com',
    bought_from: null
  })
  const [record]:Lead[] = await leads.find({email: 'moshe@moshe.com'}, {
    fields: ['id']
  })
  const {id} = record
  await leads.remove(id)
  const [record2] = await leads.find({email: 'moshe@moshe.com'}, {
    fields: ['id']
  })
  expect(record2).toBe(undefined)
})