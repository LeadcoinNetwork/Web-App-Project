// external modules
const csv = require("csv")
const fs = require("fs")
const papaparse = require("papaparse")

import { Lead, NewRealEstateLead } from "../leads/types"

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
) {
  let records = papaparse.parse(fileContents, parseConfig).data
  const leads = records.map(line => {
    const lead: NewRealEstateLead = {
      lead_price,
      ownerId: user_id,
      date: new Date().valueOf(),
      lead_type: "realestate",
      active: true,
      forSale: true,
      bought_from: 0,
    }
    for (let key in fields_map) {
      let mappedIndex = fields_map[key]
      lead[key] = line[mappedIndex]
    }
    return lead
  })
  return leads
}
