var rtlcss = require("rtlcss")
/** 
 For example

  It take a CSS syntax and returns SASS Syntax
 
 Takes:
 html {
  body {
    float:right
  }

 .ldc-ltr {
    html {
      body {
        float:right
     }
  }
 }

 .ldc-rtl {
    html {
      body {
        float:left
     }
  }
 }
   
 */
module.exports.default = function(str) {
  str = ".ldc-ltr {" + str + "} .ldc-rtl {" + rtlcss.process(str) + "}"
  return str
}
