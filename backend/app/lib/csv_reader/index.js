const Leads = require('./model')
const csv = require('csv')
const fs = require('fs')
const program = require('commander')

const parse_csv_file = (user_id, filename, field_names=[]) => {
  return new Promise(
    (resolve, reject) => {
      const opts = {
        delimiter: ','
      }
      if (field_names.length < 1)
        opts['columns'] = true
      const parser = csv.parse(opts, (e, data) => {
        console.log(data)
        data.forEach(line => {
          let json_obj = {}
          if (field_names.length > 0)
            field_names.forEach((field_name, i) => {
              json_obj[field_name] = line[i]
            })
          else
            json_obj = line
          console.log(json_obj)
          const json = {
            user_id,
            json: JSON.stringify(json_obj),
            created: new Date().valueOf()
          }
          try {
            Leads.insert(json)
          } catch (e) {
            reject(e)
          }
        })
        resolve(data.length)
      })
      try {
        fs.createReadStream(__dirname+'/'+filename).pipe(parser)
      } catch (e) {
        reject(e)
      }
    }
  )
}
program
  .version('0.0.1')
  .option('-u, --user', 'User_id')
  .option('-f, --file', 'CSV file')
  .option('-F, --fields', 'field names')
  .parse(process.argv)

if (program.user && program.file && program.fields) {
  let [user_id, filename, field_names] = program.args
  try {
    user_id = parseInt(user_id)
  } catch(e) {
    console.error('user_id not a valid number')
  }
  
  console.log('running ', user_id, filename, field_names)
  parse_csv_file(user_id, filename, field_names.split(','))
  .then( (lines_added) => {
    console.log('hehehhe', lines_added)
  })
}


module.exports = parse_csv_file