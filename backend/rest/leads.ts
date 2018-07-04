// external modules
import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
import NotFound from "../utils/not-found"
import { appModels } from "../app-logic/types"

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

  expressApp.post(
    "/leads/:id/remove",
    passport.authenticate("jwt", authOptions),
    remove_lead,
  )
  async function remove_lead(req, res, next) {
    ;(async () => {
      const { user } = req
      const { lead_id }: { lead_id: number } = req.params.id
      const res = appLogic.leads.removeLead(lead_id)
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
          .then((response) => {
            res.json({ response })
          })
          .catch((err) => {
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
    })().catch((err) => {
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
      return next()
    })().catch(done)
  }

  expressApp.get(
    "/leads/bought",
    passport.authenticate("jwt", authOptions),
    bought_leads,
  )

  async function bought_leads(req, res, next) {
    ;(async () => {
      const { user } = req
      const { sort_by } = req.body
      const response = await appLogic.leads.getBoughtLeads(user.id, { sort_by })
      if (response) return res.json(response)
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
      const { sort_by, filters } = req.body
      const response = await appLogic.leads.getSoldLeads(user.id, {
        sort_by,
        filters,
      })
      if (response) return res.json(response)
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
      const { sort_by, filters } = req.body
      const response = await appLogic.leads.getMyLeads(user.id, {
        sort_by,
        filters,
      })
      if (response) return res.json(response)
      return next()
    })().catch(done)
  }
}