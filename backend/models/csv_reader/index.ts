// external modules
import * as _ from "lodash"

const csv = require("csv")
const fs = require("fs")
const papaparse = require("papaparse")

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

  // fields with data to store as array
  const arrayFields = ["languages", "functionality"]

  // array items separator for csv
  const arraySeparator = ";"

  const leads = records.map(line => {
    const lead = {
      lead_price,
      ownerId: user_id,
      date: new Date().valueOf(),
      active: true,
      forSale: true,
      bought_from: 0,
    }
    for (let key in fields_map) {
      let mappedIndex = fields_map[key]
      lead[key] = line[mappedIndex]

      if (_.includes(arrayFields, key)) {
        lead[key] = lead[key].split(arraySeparator).map(str => str.trim())
      }
    }
    return lead
  })

  return leads
}
