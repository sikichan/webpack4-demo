const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/index.js', // 单入口
    // 多入口时
    // another: './src/another.js'
    /*
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'another.html',
      chunks: ['another']
    })
    */
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  module: {
    rules: [ // loaders 默认从右往左，从下到上执行
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader// 提取css到单独的模块
          }, 
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
              options: {
                outputPath: 'css/'
              }
            }
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              plugins: [require('autoprefixer')],
              publicPath:'../' // 需要加上这个publicPath, 否则css中的background-image的URL会加上css/目录
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')] // 自动生成浏览器前缀, 根据package.json的browserslist
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 图片 8kb 之内会转化成data:url
              mimetype: 'image/png', // data:image/png;base64
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        // test: //
      }
    ]
  },
  stats: {
    children: false
  }
}

