var fs = require("fs")
var rtlcss = require("rtlcss")
var sassloader = require("sass-loader")
module.exports.default = function(str) {
  str = ".ldc-ltr {" + str + "} .ldc-rtl {" + rtlcss.process(str) + "}"
  return str
}
