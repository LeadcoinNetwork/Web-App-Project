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

const done = a => {
  console.log("Unhandled Catch")
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
    count = parseInt(count)
    for (let i = 1; i < count + 1; i++) {
      let owner = Math.floor(count / i)
      let status = await appLogic.models.leads.insertLead({
        "Lead Type": "realestate",
        Type: "Sell",
        "Bedrooms/Baths": "2BR / 2BA",
        date: new Date().valueOf(),
        Size: chance.integer({ min: 1, max: 20 }),
        Description: chance.sentence({
          words: chance.integer({ min: 1, max: 9 }),
        }),
        State: chance.state(),
        "Housing Type": "Cardboard Box",
        bought_from: null,
        forSale: true,
        "Lead Price": chance.integer({ min: 1, max: 20 }),
        ownerId: owner,
        "Contact Person": chance.name(),
        Telephone: chance.phone(),
        active: true,
        Price: parseInt(
          chance
            .integer()
            .toString()
            .substring(0, 7)
            .slice(1, -1),
        ),
      })
      if (status.affectedRows) rc.push(status.insertId)
    }
    return rc
  }
  // Description,Bedrooms / Baths,Type,Price,Size,State,Location,Housing Type,Telephone,Contact Person

  async function mock_leads(req, res, next) {
    ;(async () => {
      const quantity: number = req.params.number
      const done = add_fake_leads(quantity)
      res.status(200)
      res.send({ done })
      return
      next()
    })().catch(done)
  }

  /**
   * There is no option yet to remove a lead
   * Later should e 2 endpoints. (selleads/remove , myleads/remove)
   */
  // expressApp.post(
  //   "/leads/:id/remove",
  //   passport.authenticate("jwt", authOptions),
  //   remove_lead,
  // )
  // async function remove_lead(req, res, next) {
  //   ;(async () => {
  //     const { user } = req
  //     const { lead_id }: { lead_id: number } = req.params.id
  //     appLogic.leads
  //       .removeLead(lead_id)
  //       .then(() => {
  //         res.status(200)
  //         res.send({ ok: true })
  //       })
  //       .catch(err => {
  //         res.status(400)
  //         res.send({ error: err.message })
  //       })
  //     next()
  //   })().catch(done)
  // }

  /**
   * get leads I added for selling
   */

  expressApp.get(
    "/sell-leads",
    passport.authenticate("jwt", authOptions),

    async function(req, res, next) {
      ;(async () => {
        const { user } = req
        let { search, sortBy, page, limit, sortOrder } = req.query
        let _sort = {
          sortBy: sortBy && sortBy != "id" ? sortBy : "date",
          sortOrder: sortOrder || "DESC",
        }
        let _limit = {
          start: parseInt(page || 0) * parseInt(limit || 50),
          offset: limit || 50,
        }
        await appLogic.leads
          .getSellLeads(user.id, {
            sort: _sort,
            filters: [],
            limit: _limit,
          })
          .then(response => {
            let jsonResponse = Object.assign(response, req.query)
            res.json(jsonResponse)
          })
          .catch(err => {
            res.status(400)
            res.send({ error: err.message })
          })
        return next()
      })().catch(done)
    },
  )

  /**
   * @param errString string
   * "key::msg ;key::msg" => {key: [msg,msg]}
   */
  const errStringToObj = errString => {
    let errors = errString.split(" ;")
    const error_obj = {}
    errors.forEach(e => {
      const [key, msg] = e.split("::")
      if (!error_obj[key]) {
        error_obj[key] = []
      }
      error_obj[key].push(msg)
    })
    return JSON.stringify(error_obj)
  }

  /**
   * Post a now lead for selling. Using a form.
   */
  expressApp.post(
    "/sell-leads/addbyform",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
      ;(async () => {
        const { user } = req
        const { lead }: { lead: Lead } = req.body
        // @ts-ignore
        if (lead && !lead.agree_to_terms) {
          res.status(400)
          res.send({
            error: {
              agree_to_terms: "Must agree to terms",
            },
          })
          return
        }
        if (lead) {
          lead.ownerId = user.id
          delete lead["agree_to_terms"]
          lead.active = true
          lead.forSale = true
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
                const error_obj = errStringToObj(err.message)
                res.send({ error: JSON.parse(error_obj) })
              }
            })
        } else {
          return next()
        }
      })().catch(err => {
        res.status(400)
        res.send({ error: err.message })
      })
    },
  )

  /**
   * make the system buy leads - for inline manual
   */
  expressApp.post(
    "/sell-leads/buymyleads",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
      ;(async () => {
        const { user } = req
        const leads = await appLogic.leads.getMockLeads(user.id)
        if (leads) {
          appLogic.leads
            .buyLeads(leads, 0)
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
    },
  )

  expressApp.post(
    "/my-leads/move",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
      ;(async () => {
        const { user } = req
        const { leads }: { leads: number[] } = req.body
        if (leads) {
          appLogic.leads
            .moveMyLeadsToSellLeads(leads)
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
    },
  )

  expressApp.post(
    "/buy-leads/buy",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
      ;(async () => {
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
    },
  )

  /**
   * Leads I bought
   */
  expressApp.get(
    "/my-leads",
    passport.authenticate("jwt", authOptions),

    async function(req, res, next) {
      ;(async () => {
        const { user } = req
        let { search, sortBy, page, limit, sortOrder, mock } = req.query
        let _sort = {
          sortBy: sortBy && sortBy != "id" ? sortBy : "date",
          sortOrder: sortOrder || "DESC",
        }
        let _limit = {
          start: parseInt(page || 0) * parseInt(limit || 50),
          offset: limit || 50,
        }
        await appLogic.leads
          .getBoughtLeads(user.id, {
            sort: _sort,
            filters: [],
            limit: _limit,
          })
          .then(response => {
            let jsonResponse = Object.assign(response, req.query)
            res.json(jsonResponse)
          })
          .catch(err => {
            res.status(400)
            res.send({ error: err.message })
          })
        return next()
      })().catch(done)
    },
  )

  /**
   * Leads I sold. Not relevent for now.
   */

  // expressApp.get(
  //   "/leads/sold",
  //   passport.authenticate("jwt", authOptions),
  //   sold_leads,
  // )

  // async function sold_leads(req, res, next) {
  //   ;(async () => {
  //     const { user } = req
  //     const { sort_by, filters, page, limit } = req.body
  //     await appLogic.leads
  //       .getSoldLeads(user.id, {
  //         sort_by,
  //         filters,
  //         page,
  //         limit,
  //       })
  //       .then(response => {
  //         res.json({
  //           list: response,
  //           sort_by,
  //           page,
  //           limit,
  //         })
  //       })
  //       .catch(err => {
  //         res.status(400)
  //         res.send({ error: err.message })
  //       })
  //     return next()
  //   })().catch(done)
  // }

  // expressApp.get(
  //   "/my-leads",
  //   passport.authenticate("jwt", authOptions),
  //   my_leads,
  // )

  // async function my_leads(req, res, next) {
  //   ;(async () => {
  //     const { user } = req
  //     const { sort_by, filters, page, limit } = req.body
  //     await appLogic.leads
  //       .getMyLeads(user.id, {
  //         sort_by,
  //         filters,
  //         page,
  //         limit,
  //       })
  //       .then(response => {
  //         res.json({
  //           list: response,
  //           sort_by,
  //           page,
  //           limit,
  //         })
  //       })
  //       .catch(err => {
  //         res.status(400)
  //         res.send({ error: err.message })
  //       })
  //     return next()
  //   })().catch(done)
  // }

  const extract_params = req => {}

  /**
   * All the leads
   */
  expressApp.get("/buy-leads", async (req, res, next) => {
    ;(async () => {
      let { search, sortBy, page, limit, sortOrder } = req.query
      let _sort = {
        sortBy: sortBy && sortBy != "id" ? sortBy : "date",
        sortOrder: sortOrder || "DESC",
      }
      let f
      if (search) {
        f = ["name", "specification", "city"].map(field => {
          return {
            field,
            op: "LIKE",
            val: search,
          }
        })
      }
      let _limit = {
        start: parseInt(page || 0) * parseInt(limit || 50),
        offset: limit || 50,
      }
      await appLogic.leads
        .getAllLeads({
          sort: _sort,
          filters: f,
          limit: _limit,
        })
        .then(response => {
          let jsonResponse = Object.assign(response, req.query)
          res.json(jsonResponse)
        })
        .catch(err => {
          res.status(400)
          res.send({ error: err.message })
        })
    })().catch(done)
  })
}
