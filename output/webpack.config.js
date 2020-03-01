const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  // entry: path.resolve(__dirname, 'src/index.js'),
  // 分离入口
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js'
    // 根据分离入口动态生成bundle名称
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin({
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}