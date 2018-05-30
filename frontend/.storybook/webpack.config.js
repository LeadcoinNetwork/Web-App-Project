const common = require('../webpack.common');

module.exports = {
  plugins: [
    common.plugins[0],
  ],
  module: common.module,
  resolve: {
    alias: common.resolve.alias,
  },
};