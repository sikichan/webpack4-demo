const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')
const options = {
  contentBase: './src',
  hot: true,
  host: 'localhost'
}

webpackDevServer.addDevServerEntrypoints(config, options)

const compiler = webpack(config)

const server = new webpackDevServer(compiler, options)

server.listen(3000, () => console.log('listen: 3000'))
