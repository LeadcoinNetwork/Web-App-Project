const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const BabiliPlugin = require("babili-webpack-plugin")
const fs = require("fs-extra")

module.exports = merge(common, {
  plugins: [
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    () => {
      fs.copySync("./src/static", "./dist")
    },
  ],
})
