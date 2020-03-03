const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // 这个是用于生产环境的，inline-source-map用于开发环境
  // production 模式下，会默认开启 UglifyJsPlugin 
  optimization: {
    minimizer: [new UglifyjsPlugin({
      sourceMap: true
    })]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})