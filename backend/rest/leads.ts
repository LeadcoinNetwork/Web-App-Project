// external modules
import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
import NotFound from "../utils/not-found"
import { appModels } from "../app-logic/types"
import * as Chance from "chance"
const chance = Chance()

import * as auth from "../models/user-auth/user-auth"

import { Lead } from "../models/leads/types"

const authOptions = {
  session: false,
}

const basic_fields = ["date", "name", "phone", "email"]

const mock_field_list = [
  "state",
  "city",
  "property type",
  "size",
  "budget",
  "bedrooms",
  "floor",
  "specification",
]
// ---

const done = a => {
  console.log(a)
}

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  expressApp.get("/leads/mock/:number", mock_leads)
  async function add_fake_leads(count) {
    const rc = []
    for (let i = 1; i < count + 1; i++) {
      let owner = Math.floor(count / i)
      let status = await appLogic.models.leads.insertLead({
        date: new Date().toDateString,
        owner_id: owner,
        name: chance.name(),
        phone: chance.phone(),
        email: chance.email(),
        active: true,
        price: chance
          .integer()
          .toString()
          .substring(0, 7),
      })
      if (status.affectedRows) rc.push(status.insertId)
    }
    return rc
  }

  async function mock_leads(req, res, next) {
    ;(async () => {
      console.log("HERE")
      const quantity: number = req.params.number
      const done = add_fake_leads(quantity)
      res.status(200)
      res.send({ done })
      return
      next()
    })().catch(done)
  }

  expressApp.post(
    "/leads/:id/remove",
    passport.authenticate("jwt", authOptions),
    remove_lead,
  )
  async function remove_lead(req, res, next) {
    ;(async () => {
      const { user } = req
      const { lead_id }: { lead_id: number } = req.params.id
      appLogic.leads
        .removeLead(lead_id)
        .then(() => {
          res.status(200)
          res.send({ ok: true })
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
      next()
    })().catch(done)
  }

  expressApp.post(
    "/leads/add",
    passport.authenticate("jwt", authOptions),
    add_lead,
  )
  async function add_lead(req, res, next) {
    ;(async () => {
      const { user } = req
      const { lead }: { lead: Lead } = req.body
      if (lead) {
        lead.owner_id = user.id
        appLogic.leads
          .AddLead(lead)
          .then(response => {
            res.json({ response })
          })
          .catch(err => {
            res.status(400)
            if (err.sqlMessage) {
              res.send({ error: err.sqlMessage })
            } else {
              res.send({ error: err.message })
            }
          })
      } else {
        return next()
      }
    })().catch(err => {
      res.status(400)
      res.send({ error: err.message })
    })
  }

  expressApp.get(
    "/leads/buy",
    passport.authenticate("jwt", authOptions),
    buy_leads,
  )

  async function buy_leads(req, res, next) {
    ;(async () => {
      /*
      TODO: buy links
      */
      const { user } = req
      const { leads }: { leads: number[] } = req.body
      if (leads) {
        appLogic.leads
          .buyLeads(leads, user.id)
          .then(response => {
            res.json({ response })
          })
          .catch(err => {
            res.status(400)
            if (err.sqlMessage) {
              res.send({ error: err.sqlMessage })
            } else {
              res.send({ error: err.message })
            }
          })
      } else {
        return next()
      }
    })().catch(err => {
      res.status(400)
      res.send({ error: err.message })
    })
  }

  expressApp.get(
    "/leads/bought",
    passport.authenticate("jwt", authOptions),
    bought_leads,
  )

  async function bought_leads(req, res, next) {
    ;(async () => {
      const { user } = req
      const { sort_by, filters, page, limit } = req.body
      await appLogic.leads
        .getBoughtLeads(user.id, {
          sort_by,
          filters,
          page,
          limit,
        })
        .then(response => {
          res.json({
            list: response,
            sort_by,
            page,
            limit,
          })
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
      return next()
    })().catch(done)
  }

  expressApp.get(
    "/leads/sold",
    passport.authenticate("jwt", authOptions),
    sold_leads,
  )

  async function sold_leads(req, res, next) {
    ;(async () => {
      const { user } = req
      const { sort_by, filters, page, limit } = req.body
      await appLogic.leads
        .getSoldLeads(user.id, {
          sort_by,
          filters,
          page,
          limit,
        })
        .then(response => {
          res.json({
            list: response,
            sort_by,
            page,
            limit,
          })
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
      return next()
    })().catch(done)
  }

  expressApp.get(
    "/leads/my",
    passport.authenticate("jwt", authOptions),
    my_leads,
  )

  async function my_leads(req, res, next) {
    ;(async () => {
      const { user } = req
      const { sort_by, filters, page, limit } = req.body
      await appLogic.leads
        .getMyLeads(user.id, {
          sort_by,
          filters,
          page,
          limit,
        })
        .then(response => {
          res.json({
            list: response,
            sort_by,
            page,
            limit,
          })
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
      return next()
    })().catch(done)
  }

  expressApp.get("/leads/all", all_leads)

  async function all_leads(req, res, next) {
    ;(async () => {
      let { limit } = req.body
      const { sort_by, filters, page } = req.body
      if (!limit) {
        limit = {
          start: 0,
          offset: 50,
        }
      }
      await appLogic.leads
        .getAllLeads({
          sort_by,
          filters,
          page,
          limit,
        })
        .then(response => {
          res.json({
            list: response,
            sort_by,
            page,
            limit,
          })
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
      return next()
    })().catch(done)
  }
}
