const {resolve} = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  // 配合 webpack-dev-server 使用, 构建的代码运行在内存中，不输出
  devServer: {
    // 运行代码的目录，需要绝对路径
    contentBase: resolve(__dirname, '../dist'),
    compress: true, // 启用gzip压缩
    port: 4000,
    host: 'localhost',
    open: true, // 自动打开浏览器
    hot: true, // 开启 HMR 功能
    watchContentBase: true, // 监视这个目录下的文件，一旦发生变化就重新加载
    watchOptions: {
      ignored: /node_modules/
    },
    clientLogLevel: 'none', // 不显示启动服务器的日志
    quiet: true, // 除了基本启动信息，其他内容不显示
    overlay: false, // 出现错误不要全屏都显示
    proxy: { // 服务器代理，可以用来解决开发环境跨域问题
      '/api': {
        target: 'http://localhost:3000',// 把请求转发到 target 服务器
        pathRewrite: { // 路径重写后再转发请求
          '^/api': ''
        }
      }
    }
  }
})