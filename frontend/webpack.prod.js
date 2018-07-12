process.env.WEBPACK_ENV = "production"

const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const fs = require("fs-extra")
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin")

module.exports = merge(common, {
  devServer: {},
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    () => {
      fs.copySync("./src/static", "./dist")
    },
    new HardSourceWebpackPlugin({
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
      sizeThreshold: 500 * 1024 * 1024, // 150 MB
    }),
  ],
})
