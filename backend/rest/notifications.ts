// external modules
import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
import { appModels } from "../app-logic/types"
import * as Chance from "chance"
const chance = Chance()

import * as auth from "../models/user-auth/user-auth"

import { Notification } from "../models/notifications/types"

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
  expressApp.get(
    "/notifications",
    passport.authenticate("jwt", authOptions),
    async function(req, res, next) {
      ;(async () => {
        const { user } = req
        const { mock } = req.query
        if (mock == 1) {
          res.json({
            msg: "ALL YOUR BASE ARE BELONG TO US!",
            userId: 666,
          })
          return
        }
        await appLogic.notifications
          .getNotificationsAndCount(user.id)
          .then(responseTupple => {
            res.json({
              list: responseTupple[0],
              unreadCount: responseTupple[1],
            })
          })
          .catch(err => {
            res.status(400)
            res.send({ error: err.message })
          })
        return next()
      })().catch(err => {
        res.status(400)
        res.send({ error: err.message })
      })
    },
  )
}
