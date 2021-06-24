const {resolve, join} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

process.env.NODE_ENV= 'development' // default browserlist in package.json is production

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/app.js',
    path: resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
    alias: {
      '@': resolve(__dirname, 'src/'),
      'img': resolve(__dirname, 'src/assets/img/'),
      'style': resolve(__dirname, 'src/assets/style/')
    }
  },
  target: 'web',
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, './src'),
    hot: true,
    quiet: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // 'postcss-preset-env' // 包含 autoprefixer
                  'autoprefixer'
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            mimetype: 'image/png',
            name: '[hash:6].[ext]',
            outputPath: 'img'
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'font/[hash:6].[ext]'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: false,
            /*
            resolve [object Module]
            */
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'style/[contenthash:6].css'
    // }),
    new HtmlWebpackPlugin({
      // title: 'new title'
      template: resolve(__dirname, 'src/public/index.html'),
      favicon: resolve(__dirname, 'src/public/favicon.ico')
      /*
       *  <link ref="shortcut icon" href="xx.ico" type="image/x-icon">
       *  <link ref="icon" href="xx.ico" type="image/x-icon">
       */
    })
  ],
  mode: 'development'
}