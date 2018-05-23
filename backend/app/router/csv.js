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

router.post("/csv/upload",[passport.authenticate("jwt", authOptions), _upload.any('file')], upload)
router.post("/csv/preview",[passport.authenticate("jwt", authOptions), _upload.any('file')], upload)

async function upload(req, res, next) {
  try {
    const {user, files} = req
    csv_reader(user.id, "../../../uploads/"+files[0].filename)
    console.log("erez",{body:req.files})
    next()
    return
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({
        path: 'upload',
        error: "Not Found"
      })
    }
  } catch (e) {
    next(e)
  }
}
