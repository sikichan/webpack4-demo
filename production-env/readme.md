## 生产环境构建
*使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码*
```js
yarn add --dev webpack-merge
```
### 配置webpack
*避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。*
```js
// webpack.prod.js
{
  mode: 'production',
  devtool: 'source-map'
}
```

### 指定环境
*许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容*
*使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化*
- 使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量

```js
const webpack = require('webpack')
plugins: [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]
```

### 分离 Split CSS
*该插件将CSS提取到单独的文件中。 它为每个包含CSS的JS文件创建一个CSS文件。 它支持CSS和SourceMap的按需加载。*
```js
yarn add --dev mini-css-extract-plugin
```

```js
// 配置webpack
plugins: [new MiniCssExtractPlugin()],
module: {
  rules: [
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
  ],
},
```
*默认情况下，mini-css-extract-plugin生成使用CommonJS模块语法的JS模块*
```js
 {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
},
// 有 options 的时候，要用loader的写法，如下
{
  use: ['style-loader']
}
// 或者
{
  use: [
    {
      loader: 'style-loader',
      options: {
        // 
      }
    }
  ]
}
```