const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js',
    // another: './src/another-entry.js',
    // print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name].css',
      // chunkFilename: 'assets/style/[id].css'
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      'img': path.resolve(__dirname, 'src/assets/img/'),
      'css': path.resolve(__dirname, 'src/assets/css/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 图片 8kb 之内会转化成data:url
              mimetype: 'image/png', // data:image/png;base64
              name: 'assets/img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true, // 使用ES模块
            }
          }, 
          'css-loader'
        ],
      },
      
    ]
  },
  stats: {
    children: false
  }
}

