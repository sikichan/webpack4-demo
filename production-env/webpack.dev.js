const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './src/',
  //   hot: true
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name].css',
      // chunkFilename: 'assets/style/[id].css'
    })
  ],
  watch: true, // 实时编译
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,// 防抖
    ignored: /node_modules/ 
  }
})