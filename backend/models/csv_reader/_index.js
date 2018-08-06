// external modules
const csv = require("csv")
const fs = require("fs")

const parse_csv_file = (user_id, filename, fields_map) => {
  return new Promise((resolve, reject) => {
    const opts = {
      delimiter: ",",
    }
    let field_list
    if (field_names.length < 1) opts["columns"] = true
    const parser = csv.parse(opts, (e, data) => {
      if (e) return reject(e)
      const batch_id = new Date().valueOf()
      data.forEach(line => {
        let json_obj = {}
        if (field_names.length > 0) {
          field_names.forEach((field_name, i) => {
            json_obj[field_name] = line[i]
          })
          field_list = field_names
        } else {
          json_obj = line
          field_list = Object.keys(json_obj)
        }
        try {
          LeadsUpload.insert({
            user_id,
            batch_id,
            json: JSON.stringify(json_obj),
            created: new Date().valueOf(),
          })
        } catch (e) {
          reject(e)
        }
      })
      resolve({ x: data.length, batch_id, field_list })
    })
    try {
      const onlyFileName = filename.split("/").pop()
      fs.createReadStream(config.upload + "/" + onlyFileName).pipe(parser)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = parse_csv_file
