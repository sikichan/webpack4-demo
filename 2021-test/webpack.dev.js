const {merge} = require('webpack-merge')
const {resolve, join} = require('path')
const common = require('./webpack.config.js')
process.env.NODE_ENV= 'development' // default browserlist in package.json is production

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    // compress: true,
    port: 9000,
    // open: true,
    hot: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   options: {
      //     fix: true
      //   }
      // },
    ]
}
})