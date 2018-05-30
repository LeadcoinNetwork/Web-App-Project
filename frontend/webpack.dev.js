const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    stats: {
      colors: true,
      env: true,
    },
    host: '0.0.0.0'
  }
});