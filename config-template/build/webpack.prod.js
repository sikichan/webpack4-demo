const {resolve} = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(baseConfig, {
  // 生产环境模式会自动加载 UglifyJsPlugin
  mode: 'production', 
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024, // 分割 chunk 最小为 30 kb
      minChunks: 1, // 要分割的 chunk 最少要被引用一次
      maxAsyncRequests: 5, // 按需加载是并行加载文件的最大数量
      maxInitialRequests: 3, // 入口文件最大并行请求数量
      automaticNameDelimiter: '~',
      name: true, // 允许使用命名规则
      cacheGroups: { // 分割 chunk 组
        vendors: { // --> verdors~xxx.js
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 如果当前要打包的模块和之前已经被提取出来的模块是同一个，就无需重新打包
          reuseExistingChunk: true 
        }
      }
    },
    // 将当前模块记录其他模块的 hash 值单独打包为一个文件
    // 从而解决因为修改 a 文件，导致 b 文件中记录了 a 文件的contenthash值的变化而导致的缓存失效
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 以下是默认值
        // cache: true
        // extractComments: true // 提取注释到单独txt文件
        // parallel: true, // 开启多进程打包
        // Works only with source-map, inline-source-map, hidden-source-map and nosources-source-map values for the devtool option.
        // sourceMap: true 
        
      })
    ]
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html'),
      name: 'production',
      // 压缩html
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true // 移除注释
      }
    })
  ],
})