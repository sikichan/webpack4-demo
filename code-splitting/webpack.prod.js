const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map', // 这个是用于生产环境的，inline-source-map用于开发环境
  // production 模式下，会默认开启 UglifyJsPlugin 
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
      // cacheGroups: {
      //   commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: "vendors",
      //       chunks: "all"
      //   }
      // }
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  // entry: {
  //   app: './src/index.js',
  //   another: './src/another-entry.js'
  // },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].bundle.js'
  // },
})