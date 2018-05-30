const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

module.exports = merge(common, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  plugins: [new OpenBrowserPlugin({ url: "http://localhost:8080" })],
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    stats: {
      colors: true,
      env: true
    },
    host: "0.0.0.0"
  }
});
