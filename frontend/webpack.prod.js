process.env.WEBPACK_ENV = "production"

const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const fs = require("fs-extra")

module.exports = merge(common, {
  devServer: {},
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    () => {
      fs.copySync("./src/static", "./dist")
    },
  ],
})

/*
function AddRTLCSSFromBundle() {
  // Plugins must have a constructor
  return this
}

AddRTLCSSFromBundle.prototype.apply = function(compiler) {
  compiler.plugin("done", function() {
    fs.writeFileSync(
      "./dist/bundle.rtl.css",
      rtlcss.process(fs.readFileSync("./dist/bundle.css")),
    )
  })
}
*/
