// external modules
const csv = require("csv")
const fs = require("fs")
const papaparse = require("papaparse")

import { Lead, Industry } from "../leads/types"

export interface fieldsMap {
  fieldName: {
    mappedName: string
    mappedIndex: number
  }
}

const parseConfig = {
  delimiter: ",",
  quotedChar: '"',
  header: true,
}

export function parseMappedFile(
  user_id,
  fileContents,
  fields_map: fieldsMap,
  lead_price: number,
  industry: Industry,
) {
  let records = papaparse.parse(fileContents, parseConfig).data
  const leads = records.map(line => {
    const lead = {}
    for (let key in fields_map) {
      let mappedIndex = fields_map[key]
      lead[key] = line[mappedIndex]
    }
    lead["lead_price"] = lead_price
    lead["ownerId"] = user_id
    lead["date"] = new Date().valueOf()
    lead["Industry"] = industry
    lead["active"] = true
    lead["forSale"] = true
    lead["bought_from"] = 0
    return lead
  })
  return leads
}
