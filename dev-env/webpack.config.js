const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
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
    filename: '[name]_[contenthash:6].bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve('src/assets/')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  module: {
    rules: [
    ]
  },
  devtool: 'inline-source-map', // 不要用于生产环境！
  // 通过来自 webpack-dev-server 的这些选项，能够用多种方式改变其行为
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}