process.env.WEBPACK_ENV = "production"

const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const fs = require("fs-extra")
const cp = require("child_process")
const exec = cp.exec

module.exports = merge(common, {
  devServer: {},
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    () => {
      fs.copySync("./src/static", "./dist")
      exec("git log -1 > ./dist/health.txt")
    },
  ],
})
