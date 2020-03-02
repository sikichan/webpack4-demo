## 模块热替换
*模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。*
*只适用于开发环境*

### 启用HMR 
*更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件*
```js
// 1 - 修改webpack.config.js
devServer: {
  contentBase: './src',
  hot: true // 模块热替换，只更新修改了的模块，无需重新加载整个页面
},
plugins: [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
]
// or 2- 修改webpack-dev-server 配置
"script": "webpack-dev-server --hotOnly"
```

### 通过Node.js api
*当使用 webpack dev server 和 Node.js API 时，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递*
- new WebpackDevServer(compiler, options)

```js
// dev-server.js add 
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
```
