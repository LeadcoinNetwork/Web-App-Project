const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
var dotenv = require("dotenv");
dotenv.config();

module.exports = merge(common, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  plugins: [new OpenBrowserPlugin({ url: process.env.FRONTEND })],
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    stats: {
      colors: true,
      env: true
    },
    port: process.env.PORT,
    host: "127.0.0.1"
  }
});
