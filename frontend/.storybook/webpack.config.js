const common = require("../webpack.common");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  plugins: [new ExtractTextPlugin("bundle.css")],
  module: common.module,
  resolve: {
    alias: common.resolve.alias
  },
  devServer: {
    hot: true
  }
};
