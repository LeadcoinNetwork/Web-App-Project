const common = require("../webpack.common");

module.exports = {
  plugins: [common.__extractTextPluginToBundle],
  module: common.module,
  resolve: {
    alias: common.resolve.alias
  }
};
