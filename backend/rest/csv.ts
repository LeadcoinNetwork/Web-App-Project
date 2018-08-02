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
  var multer = require("multer")
  var _upload = multer({ dest: "uploads/" })

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

  expressApp.post(
    "/csv/upload",
    [passport.authenticate("jwt", authOptions), _upload.any("file")],
    upload,
  )

  async function upload(req, res, next) {
    try {
      const { user, files } = req
      const {
        fields_map,
        lead_price,
        agreeToTerms,
      }: {
        fields_map: fieldsMap
        lead_price: number
        agreeToTerms: boolean
      } = req.body
      parseMappedFile(
        user.id,
        "../../../uploads/" + files[0].filename,
        fields_map,
      )
        .then(csvLines => {
          csvLines.map(async csvLine => {
            appLogic.leads.AddLead(csvLine)
          })
        })
        .catch(e => {
          next(e)
        })
    } catch (e) {
      next(e)
    }
  }
}
