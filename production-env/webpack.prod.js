const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  // 源码映射 不同的值影响到 build 和 rebuild 的速度
  devtool: 'source-map',// 当前报错的行和列，文件单独出来，（生产）
  /* eval-source-map 不产生单独文件，有行和列 
   * cheap-module-source-map  只有行，单独文件 （生产）
   * cheap-module-eval-source-map 不产生单独文件，只有行
   */
  // production 模式下，会默认开启 UglifyJsPlugin, SideEffectsFlagPlugin
  optimization: {
    minimizer: [
      // 压缩js
      new UglifyjsPlugin({
        sourceMap: true
      }),
      // 压缩css
      new OptimizeCssPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
})