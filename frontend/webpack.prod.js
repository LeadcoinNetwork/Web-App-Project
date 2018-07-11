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
