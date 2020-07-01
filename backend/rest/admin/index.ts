import * as Express from "express"
import AppLogic from "../../app-logic/index"

import * as users from "./users"
import * as leads from "./leads"
import * as transactions from "./transactions"
import * as auctions from "./auctions"
import * as bets from "./bets"
import * as reviews from "./reviews"
import * as authenticate from "./authenticate"
import queryParser from "../../midelvares/queryParaser"

require("dotenv").config()

const NodeEnv = process.env.NODE_ENV

export const start = ({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) => {
  expressApp.use(/\/api\/admin\/.*/, queryParser)
  expressApp.use("/", Express.static("./rest/admin/build"))

  users.start({ appLogic, expressApp })
  leads.start({ appLogic, expressApp })
  transactions.start({ appLogic, expressApp })
  auctions.start({ appLogic, expressApp })
  bets.start({ appLogic, expressApp })
  reviews.start({ appLogic, expressApp })
  authenticate.start({ appLogic, expressApp })

  console.log("start admin")
}
