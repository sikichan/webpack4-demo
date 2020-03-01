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
    filename: '[name]_[contenthash:6].bundle.js'
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
      {
        test: /\.css$/, // 正则匹配.css结尾的文件
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg|svg)$/i,
      //   use: ['file-loader']
      // },
      
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 图片 8kb 之内会转化成data:url
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