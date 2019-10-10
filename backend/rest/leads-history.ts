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
    const { leadId } = req.query
    appLogic.leadsHistory
      .getLeadHistory({ leadId })
      .then(history => {
        res.json(history)
      })
      .catch(err => {
        res.status(500).send({ error: err.message })
      })
  }
}
