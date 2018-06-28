// external modules
import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
import NotFound from "../utils/not-found"
import { appModels } from "app-logic/types"

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
  /*
  expressApp.get("/auth/confirm-email-update", confirmEmailUpdate)
  expressApp.get(
    "/auth/resend-email",
    passport.authenticate("jwt", authOptions),
    resendEmail,
  )
  */
  expressApp.post(
    "/leads/:id/remove",
    passport.authenticate("jwt", authOptions),
    remove_lead,
  )
  async function remove_lead(req, res, next) {
    ;(async () => {
      const { user } = req
      const { lead_id }: { lead_id: number } = req.body
      // const res = appLogic.leads.removeLead(lead_id)
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
      lead.owner_id = user.id
      const res = await appLogic.leads.AddLead(lead)
      console.log(res)
      return
      next()
    })().catch(done)
  }
}
/*

router.post("/leads/buy", passport.authenticate("jwt", authOptions), buy_leads)
async function buy_leads(req, res, next) {
  const { user } = req
  const { bought_ids } = req.body
  try {
    const _leads = await leads.find(
      { active: 1 },
      "*",
      "id in (" + bought_ids + ")",
    )
    _leads.forEach(lead => {
      lead.active = 0
      leads.update(lead).then(x => {
        let ext_data = {}
        try {
          ext_data = JSON.parse(lead["ext_data"])
        } catch (e) {
          console.error(e)
          return next(e)
        }
        ext_data["bought_from"] = lead.user_id
        lead.user_id = req.user.id
        lead.ext_data = JSON.stringify(ext_data)
        lead.active = 1
        delete lead["id"]
        leads.insert(lead)
      })
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
  return next()
}

router.get("/leads/bought", passport.authenticate("jwt", authOptions), buy)
async function buy(req, res, next) {
  const { user } = req
  const { sort_by } = req.body
  const where_condition = "JSON_EXTRACT(ext_data, '$.bought_from')"
  try {
    const my_leads = await leads.find({ user_id: user.id }, "*", {
      where_condition,
      sort_by,
    })
    const flat_leads = my_leads.map(flatten_lead)
    return res.json(flat_leads)
  } catch (e) {
    next(e)
  }
}

router.get("/leads/sold", passport.authenticate("jwt", authOptions), sell)
async function sell(req, res, next) {
  const { user } = req
  const { sort_by } = req.body
  try {
    const my_leads = await leads.find(
      { user_id: user.id, active: 0 },
      { sort_by },
    )
    const flat_leads = my_leads.map(flatten_lead)
    return res.json(flat_leads)
  } catch (e) {
    next(e)
  }
}

router.get("/leads/my", passport.authenticate("jwt", authOptions), my_leads)
async function my_leads(req, res, next) {
  const { user } = req
  const { sort_by } = req.body
  try {
    const my_leads = await leads.find({ user_id: user.id }, "*", { sort_by })
    const flat_leads = my_leads.map(flatten_lead)
    return res.json(my_leads)
  } catch (e) {
    next(e)
  }
}
*/
