const express = require("express")
const passport = require("passport")
const auth = require("../lib/auth")
const leads_upload = require("../model/leads_upload")
const leads = require("../model/leads")
const csv_reader = require("../lib/csv_reader")

const router = express.Router()
module.exports = router

const authOptions = {
  session: false 
}
var multer  = require('multer')
var _upload = multer({ dest: 'uploads/' })

const basic_fields = [
  "date",
  "name",
  "phone",
  "email"
]

const mock_field_list = [
  "state",
  "city",
  "property type",
  "size",
  "budget",
  "bedrooms",
  "floor",
  "specification"
]

router.post("/csv/upload",[passport.authenticate("jwt", authOptions), _upload.any('file')], upload)
async function upload(req, res, next) {
  try {
    const {user, files} = req
    csv_reader(user.id, "../../../uploads/"+files[0].filename)
    .then((response) => {
      res.json({data: response, db_field_list: basic_fields.concat(mock_field_list)})
    })
    .catch((e) => {
      next(e)
    })
  } catch (e) {
    next(e)
  }
}

router.post("/csv/mapper/:batchId",passport.authenticate("jwt", authOptions), mapper)
async function mapper(req, res, next) {
  try {
    const {user} = req
    const {field_map, batch_id, lead_price} = req.body

    let lead_uploads = await leads_upload.find({ batch_id: req.params.batchId })
    lead_promises = lead_uploads.map(lead => {
      let insert_params = {
        user_id: req.user.id,
        created: new Date().valueOf(),
        ext_data: {}
      }
      let fields = Object.keys(field_map)
      fields.forEach((our_field) => {
        try {
          const data = JSON.parse(lead.json)
          const index = field_map[our_field]
          if (basic_fields.indexOf(our_field) > -1) {
            insert_params[our_field] = data[index]
          } else {
            insert_params['ext_data'][our_field] = data[index]
          }
        } catch(e) {
          console.log("ERROR")
          next(e)
        }
      });
      if (insert_params['ext_data']) {
        insert_params['ext_data'] = JSON.stringify(insert_params['ext_data'])
      }
      return leads.insert(insert_params)
      .then( () => {
        lead.processed = true
        leads_upload.update(lead)
      })
    })
    Promise.all(lead_promises)
    .then((results) => {
      res.json({done: results.length})
    })
    .catch((e) => {
      console.error(e)
      next(e)
    })
    return
  } catch (e) {
    next(e)
  }
}