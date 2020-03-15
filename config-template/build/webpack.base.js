const {resolve} = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { // 单入口
    app: resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[contenthash:6].js',
    path: resolve(__dirname, '../dist'),
    // chunkFilename 为非入口 chunk 的名称 
    // 通过import()语法的 /*webpackChunkName:'xxx'*/ 指定 chunk 名称
    chunkFilename: 'js/[name].[contenthash:6]_chunk.js',
    // publicPath 为所有资源公共路径的前缀，用于生产环境 
    // publicPath: '/',
    library: '[name]', // 整个库向外暴露的变量名
    // 变量名添加到那个全局变量上，或者以哪种方式暴露出去
    libraryTarget: 'window' // 'global' | 'commonjs' | 'amd' 
  },
  module: {
    rules: [
      // yarn add --dev eslint eslint-loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          // yarn add --dev less less-loader
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  esModules: true
                }
              }
            ]
          },
          // yarn add --dev @babel/core babel-loader @babel/preset-env
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            exclude: /\.(css|less|js|html)/,
            loader: 'file-loader'
          },
          {
            test: /\.(png|gif|jpe?g|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader' // 处理 HTML 中的图片，从而被 url-loader 处理
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html')
    })
  ],
  resolve: {
    alias: { // 解析模块的路径别名
      '$styles': resolve(__dirname, '../src/assets/styles'),
      '$imgs': resolve(__dirname, '../src/assets/imgs')
    },
    // 省略文件路径的后缀
    extensions: ['.js', '.json', '.css', '.less'],
    // 告诉 webpack 解析模块是可以直接去哪个目录找， 可以传入一个绝对路径
    modules: [
      resolve(__dirname, '../node_modules'),
      'node_modules'
    ]
  }
}