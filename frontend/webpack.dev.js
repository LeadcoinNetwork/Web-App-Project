const merge = require("webpack-merge")
const common = require("./webpack.common.js")
var dotenv = require("dotenv")
dotenv.config()
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin")

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
  // plugins: [
  //   new HardSourceWebpackPlugin({
  //     maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
  //     sizeThreshold: 500 * 1024 * 1024, // 150 MB
  //   }),
  // ],
})
