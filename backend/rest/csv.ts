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

const contains_contact = lead => {
  return lead.telephone || lead.name || lead.email || lead["Contact Person"]
}

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
  return error_obj
}

const validate_mapping = body => {
  const errors = []
  const {
    fields_map,
    lead_price,
    agree_to_terms,
  }: {
    fields_map: fieldsMap
    lead_price: number
    agree_to_terms: boolean
  } = body
  if (!lead_price) errors.push("Lead Price::Lead price is required")
  if (!agree_to_terms) errors.push("agree_to_terms::Must agree to terms")
  if (!contains_contact(fields_map)) {
    errors.push("Telephone::At least one contact info is required")
    errors.push("Contact Person::")
    errors.push("Email::")
  }
  return errors
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
        fileContent,
      }: {
        fields_map: fieldsMap
        lead_price: number
        fileContent: string
      } = req.body
      let errors = []
      errors = validate_mapping(req.body)
      if (errors.length > 0) {
        let errorString = errors.join(" ;")
        let error_obj = errStringToObj(errorString)
        res.status(400)
        return res.send({ error: error_obj })
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
