const common = require("../webpack.common")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.entry.preview.unshift("babel-polyfill")
  defaultConfig.plugins.push(new ExtractTextPlugin("bundle.css"))
  defaultConfig.module = common.module
  defaultConfig.resolve.extensions = common.resolve.extensions
  defaultConfig.resolve.alias = common.resolve.alias

  defaultConfig.externals = {
    jsdom: "window",
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": "window",
    "react/addons": true,
  }
  return defaultConfig
}
