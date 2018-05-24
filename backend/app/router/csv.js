const express = require("express")
const passport = require("passport")
const auth = require("../lib/auth")
const User = require("../controller/user");
const csv_reader = require("../lib/csv_reader")

const router = express.Router()
module.exports = router

const authOptions = {
  session: false 
}
var multer  = require('multer')
var _upload = multer({ dest: 'uploads/' })

const mock_field_list = [
  "Date",
  "Name",
  "Telephone",
  "Email",
  "State",
  "City",
  "Property Type",
  "Size(SqFt)",
  "Budget",
  "Bedrooms",
  "Floor",
  "Specification",
  "Lead Price"
]

router.post("/csv/upload",[passport.authenticate("jwt", authOptions), _upload.any('file')], upload)

async function upload(req, res, next) {
  try {
    const {user, files} = req
    csv_reader(user.id, "../../../uploads/"+files[0].filename)
    .then((response) => {
      res.json({data: response, db_field_list: mock_field_list})
    })
    .catch((e) => {
      next(e)
    })
  } catch (e) {
    next(e)
  }
}
