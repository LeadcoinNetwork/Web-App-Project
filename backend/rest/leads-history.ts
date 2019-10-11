import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"

const authOptions = {
  session: false,
}

export function start({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) {
  expressApp
    .route("/leads-history")
    .all(passport.authenticate("jwt", authOptions))
    .get(getLeadHistoryByLeadId)

  function getLeadHistoryByLeadId(req, res, nex) {
    const { user } = req
    const { leadId, page, limit } = req.query
    let _limit = {
      start: parseInt(page || 0) * parseInt(limit || 10000),
      offset: limit || 10000,
    }
    appLogic.leadsHistory
      .getLeadHistory(leadId, user.id, _limit)
      .then(history => {
        res.json(history)
      })
      .catch(err => {
        res.status(500).send({ error: err.message })
      })
  }
}
