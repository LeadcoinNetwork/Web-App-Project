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
    count = parseInt(count)
    for (let i = 1; i < count + 1; i++) {
      let owner = Math.floor(count / i)
      let status = await appLogic.models.leads.insertLead({
        date: new Date().toDateString(),
        floor: chance.integer({ min: 1, max: 4 }),
        rooms: chance.integer({ min: 1, max: 4 }),
        size: chance.integer({ min: 1, max: 20 }),
        budget: chance.integer({ min: 100000, max: 1000000 }),
        city: chance.city(),
        specification: chance.sentence({
          words: chance.integer({ min: 1, max: 9 }),
        }),
        state: chance.state(),
        propertyType: "Cardboard Box",
        ownerId: owner,
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
          sortBy: sortBy || "date",
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
            let jsonResponse = Object.assign({ list: response }, req.query)
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
   * Post a now lead for selling. Using a form.
   */
  expressApp.post(
    "/sell-leads/addbyform",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
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
    },
  )

  /**
   * Buying a lead.
   */
  expressApp.post(
    "/buy-leads/buy",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
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
        let { search, sortBy, page, limit, sortOrder } = req.query
        let _sort = {
          sortBy: sortBy || "date",
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
            let jsonResponse = Object.assign({ list: response }, req.query)
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

  /**
   * All the leads
   */
  expressApp.get("/buy-leads", async (req, res, next) => {
    ;(async () => {
      let { search, sortBy, page, limit, sortOrder } = req.query
      let _sort = {
        sortBy: sortBy || "date",
        sortOrder: sortOrder || "DESC",
      }
      let _limit = {
        start: parseInt(page || 0) * parseInt(limit || 50),
        offset: limit || 50,
      }
      await appLogic.leads
        .getAllLeads({
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
  })
}
