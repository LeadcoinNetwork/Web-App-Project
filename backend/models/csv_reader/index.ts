// external modules
const csv = require("csv")
const fs = require("fs")

import { Lead } from "../leads/types"

export interface fieldsMap {
  fieldName: {
    mappedName: string
    mappedIndex: number
  }
}

export function parseMappedFile(
  user_id,
  filename,
  fields_map: fieldsMap,
): Promise<Lead[]> {
  return new Promise((resolve, reject) => {
    const opts = {
      delimiter: ",",
      columns: true,
    }
    const parser = csv.parse(opts, (e, data) => {
      if (e) return reject(e)
      const response = []
      data.forEach(line => {
        let json_obj = {}
        for (let key in fields_map) {
          let { mappedIndex } = fields_map[key]
          json_obj[key] = line[mappedIndex]
        }
        response.push(json_obj)
        return
      })
      resolve(response)
    })
    try {
      fs.createReadStream(filename).pipe(parser)
    } catch (e) {
      reject(e)
    }
  })
}
