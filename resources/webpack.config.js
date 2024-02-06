const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  // entry: path.resolve(__dirname, 'src/index.js'),
  // context: path.resolve(__dirname, 'app'),
  // 分离入口
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js'
    // 根据分离入口动态生成bundle名称
    filename: '[name]_[contenthash:6].bundle.js'
  },
  resolve: { // 解析
    alias: { // 创建 import 或 require 的别名，来确保模块引入变得更简单
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
      {
        test: /\.css$/, // 正则匹配.css结尾的文件
        use: [
          'style-loader',  // 创建<style>标签插入到html的<head>标签中
          'css-loader' // 将css文件变成commonjs 模块加载到js中，识别@import的语法，和js里import或require
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // exclude: /\.(css|less|js|html)$/,
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // use: ['file-loader'] // 将资源文件复制并原样打包输出
        loader: 'file-loader',
        options: {
          // name: '[path][contenthash].[ext]'
          outputPath: 'assests'
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        use: [
          {
            loader: 'url-loader', // 依赖于file-loader
            options: {
              name: '[contenthash].[ext]',
              outputPath: 'assests/images',
              limit: 8 * 1024, // 图片 小于8kb 会转化成data:url，可以减少请求数
              mimetype: 'image/png' // data:image/png;base64
            }
          }
        ]
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
    ]
  }
}