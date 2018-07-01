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

const basic_fields = [
  "date",
  "name",
  "phone",
  "email"
]

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

const mock_records = [{
  "date": "01/07/2018",
  "name": "mock record 1",
  "phone": "03-67674321",
  "email": "email@email.com",
  "state": "A",
  "city": "B",
  "property type": "C",
  "size": "10",
  "budget": "1",
  "bedrooms": "1",
  "floor": "1",
  "specification": "",
  } , {
  "date": "02/07/2018",
  "name": "mock record 2",
  "phone": "03-67674321",
  "email": "email@email.com",
  "state": "C",
  "city": "A",
  "property type": "B",
  "size": "11",
  "budget": "2",
  "bedrooms": "1",
  "floor": "3",
  "specification": "",
  } , {
  "date": "03/07/2018",
  "name": "mock record 3",
  "phone": "03-67674321",
  "email": "email@email.com",
  "state": "B",
  "city": "C",
  "property type": "A",
  "size": "11",
  "budget": "2",
  "bedrooms": "1",
  "floor": "3",
  "specification": "",
  } , {
  "date": "04/07/2018",
  "name": "mock record 4",
  "phone": "03-67674321",
  "email": "email@email.com",
  "state": "B",
  "city": "C",
  "property type": "A",
  "size": "11",
  "budget": "4",
  "bedrooms": "2",
  "floor": "1",
  "specification": "",
  } , {
  "date": "02/07/2018",
  "name": "mock record 5",
  "phone": "03-67674321",
  "email": "email@email.com",
  "state": "B",
  "city": "C",
  "property type": "A",
  "size": "11",
  "budget": "4",
  "bedrooms": "2",
  "floor": "2",
  "specification": "",
  },
]

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
      if (lead && lead.email) {
        lead.owner_id = user.id
        const response = await appLogic.leads.AddLead(lead)
        res.json({response})
      } else {
        return next()
      }
    })().catch(done)
  }

  expressApp.get(
    "/leads/buy",
    passport.authenticate("jwt", authOptions),
    buy_leads,
  )
  async function buy_leads(req, res, next) {
    ;(async () => {
      /*
      const { user } = req
      const { bought_ids } = req.body
      try {
        const _leads = await leads.find(
          { active: 1 },
          "*",
          "id in (" + bought_ids + ")",
        )
        _leads.forEach(lead => {
          lead.active = false
          appLogic.leads.updateLead(lead).then(x => {
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
            appLogic.leads.AddLead(lead)
          })
        }) } catch (e) { console.error(e)
        next(e)
      }
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
      if (response)
        return res.json(response)
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
      const response = await appLogic.leads.getSoldLeads(user.id, { sort_by, filters })
      if (response)
        return res.json(response)
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
      const response = await appLogic.leads.getMyLeads(user.id, { sort_by, filters })
      if (response)
        return res.json(response)
      return next()
    })().catch(done)
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
