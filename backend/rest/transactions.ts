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
    .route("/transactions")
    .all(passport.authenticate("jwt", authOptions))
    .get(getTransactionsByUserId)

  function getTransactionsByUserId(req, res, next) {
    const { userId, page, limit } = req.query
    const _limit = {
      start: parseInt(page || 0) * parseInt(limit || 10000),
      offset: limit || 10000,
    }
    appLogic.transactions
      .getTransactionsByUserId(userId, _limit)
      .then(userId => {
        res.json(userId)
      })
      .catch(err => {
        res.status(500).send({ error: err.message })
      })
  }
}
