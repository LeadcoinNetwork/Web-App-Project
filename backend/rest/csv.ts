// external modules
import * as passport from "passport"
import * as Express from "express"
import AppLogic from "../app-logic/index"
import NotFound from "../utils/not-found"
import { appModels } from "../app-logic/types"
import * as Chance from "chance"
const chance = Chance()
import { parseMappedFile, fieldsMap } from "../models/csv_reader/index"
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
  expressApp.post(
    "/csv/upload",
    passport.authenticate("jwt", authOptions),
    upload,
  )

  async function upload(req, res, next) {
    try {
      const { user } = req
      const {
        fields_map,
        lead_price,
        agree_to_terms,
        fileContent,
      }: {
        fields_map: fieldsMap
        lead_price: number
        agree_to_terms: boolean
        fileContent: string
      } = req.body
      console.log(Object.keys(req.body))
      if (!agree_to_terms) {
        res.status(400)
        res.send({
          error: {
            agree_to_terms: "Must agree to terms",
          },
        })
        return
      }
      const leads = await parseMappedFile(
        user.id,
        fileContent,
        fields_map,
        lead_price,
      )
      leads.map(async lead => {
        const res = await appLogic.leads.AddLead(lead)
      })
      return
    } catch (e) {
      next(e)
    }
  }
}
