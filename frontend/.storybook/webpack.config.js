const common = require("../webpack.common")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.entry.preview.unshift("babel-polyfill")
  defaultConfig.plugins.push(new ExtractTextPlugin("bundle.css"))
  defaultConfig.module = common.module
  defaultConfig.resolve.alias = common.resolve.alias

  return defaultConfig
}
