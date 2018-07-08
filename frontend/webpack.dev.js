const merge = require("webpack-merge")
const common = require("./webpack.common.js")
var dotenv = require("dotenv")
dotenv.config()

module.exports = merge(common, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  devServer: {
    contentBase: "./src/static",
    historyApiFallback: true,
    clientLogLevel: "error",
    stats: {
      stats: "errors-only",
      colors: true,
      env: true,
    },
    port: process.env.PORT,
    host: "0.0.0.0",
    disableHostCheck: true,
  },
})
