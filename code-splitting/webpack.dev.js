const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/import-index.js'
  },
  // devServer: {
  //   contentBase: './src/',
  //   hot: true
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Code-Splitting'
    }),
  ],
})