# webpack4 跟着官文走
## 本地安装
```js
npm install --save-dev webpack
npm install --save-dev webpack@<version>
npm install --save-dev webpack-cli
```
or
```js
yarn add --dev webpack@4.41.6
yarn add --dev webpack-cli
```

### 运行
- node_modules/.bin/webpack --config webpack.config.js
or
- npx webpack --config webpack.config.js

*不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。*

## 管理输出
### plugins
**HtmlWebpackPlugin** 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中,也可以设置template使用原有的index.html,在把bundle文件加进去
**clean-webpack-plugin** 在每次构建前清理 /dist 文件夹，是比较推荐的做法

### 分离入口
*“包”(bundle) 就是把相关代码都打包进入的单个文件。如果你不想把所有的代码都放入一个包中，你可以把它们划分为多个包，也就是“块”(chunk) 中*

#### 打包分离 (Bundle splitting)
*打包分离背后的思想非常简单。如果你有一个体积巨大的文件，并且只改了一行代码，用户仍然需要重新下载整个文件。但是如果你把它分为了两个文件，那么用户只需要下载那个被修改的文件，而浏览器则可以从缓存中加载另一个文件*

#### 哈希（hash）与性能
**hash** 针对的是每一次构建（build）而言，每一次构建之后生成的文件所带的哈希都是一致的。它关心的是 **整体项目** 的变化，只要有 **任意文件内容** 发生了更改，那么构建之后其他文件的哈希也会发生更改。

**chunkhash** 基于的是每一个 chunk(块) 内容的改变，如果是该 chunk 所属的内容发生了变化，那么只有该 chunk 的输出文件的哈希会发生变化

**contenthash** 该哈希根据的是文件的内容。从这个角度上说，它和chunkhash是能够相互代替的


## 开发
### 使用source map
*当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js*
```js
//修改webpack.config.js配置文件
devtool: 'inline-source-map'
```

### 使用观察模式
```js
// 此方法修改文件后会自动编译，但是需要刷新浏览器
"scripts": {
  "watch": "webpack --watch"
}
```

### 使用 webpack-dev-server
```js
yarn add --dev webpack-dev-server
```

```js
//修改webpack.config.js配置文件，告诉开发服务器(dev server)
devServer: {
  contentBase: './src', //源文件改变时重新编译并自动刷新浏览器
}

// package.json scripts
"scripts": {
  "dev": "webpack-dev-server --open" //--open自动打开浏览器
}
```

### 使用 webpack-dev-middle
*webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它。它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求*
*可配合express*
```js
yarn add --dev webpack-dev-middleware express
```
```js
//修改webpack.config.js
output: {
  publicPath: '/' //publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
}
```

# 2023 9.25
## webpack 静态模块打包工具, as to webpack, every source are modules
###webpack 主要作用
1. 模块打包。把不同模块文件打包整合在一起
2. 编译兼容。通过webpack *loader* 机制，可以对代码做polyfill, 还可以编译转换.less, .sass, .vue, .jsx等浏览器无法识别的格式文件
3. 能力扩展。通过*Plugin*机制，实现进一步按需加载，代码压缩等，提高自动化程度，工程效率

### webpack 构建流程
1. 初始化：启动构建，读取合并配置参数，加载Plugin，实例化Compiler
2. 编译：从 entry 出发，针对每个module 串行调用对应的loader去翻译文件内容，再找到该module依赖的module，递归地进行编译处理
3. 输出：将编译后的 module 组合成 chunk, 将 chunk 转换成文件，输出到文件系统中

### 常用loader, loader 是从后往前执行
- image-loader
- babel-loader
- file-loader 把文件输出到一个文件中，hash值不变可以缓存
- url-loader 设置一个阈值limit, 大于阈值交给file-loader处理，小于阈值时返回base64到图片或字体
- css-loader 支持模块化、压缩、文件导入 @import
- style-loader 编译完css 后挂载到页面 style标签上
- less-loader .less
- sass-loader .scss/.sass
- eslint-loader 通过eslint检查js代码
- postcss-loader 扩展css语法，配合autoprefix 插件自动补齐css3前缀
- vue-loader
- ts-loader

### 常见plugin
HtmlWebpackPlugin 创建html模板
CleanWebpackPlugin 清理目录
MiniCssExtractPlugin 分离样式文件，提取css为独立文件，支持按需加载

## Difference between loader and plugins ?
*plugin* 插件，扩展webpack的功能，贯穿整个webpack运行的生命周期，webpack会广播出很多事件，然后plugin会监听到事件做出相应的输出
*loader* 本质是一个函数，对接受到的内容进行转换，编译，理解为翻译官。因为webapck本来只认识javascript, json

loader 在 module.rules 中配置
module: {
  rules: [
    {
      test: ``,
      loader: '',
      options: {
      }
    },
    {
      test: ``,
      use: [loaders]
    }
  ]
},
plugins: [
  new HtmlWebpackPlugin()
]

### babel-loader babel/preset-env babel-polyfill babel-transform-runtime ?
babel-loader 把babel 和 webpack连接上相当于桥梁
babel/preset-env 预设，能把es6语法翻译成 es5 （Generator, Promsise不行）
babel-polyfill 支持 Generator, Promsise，会污染全局环境
babel-transform-runtime 提供沙箱环境，不会污染全局环境

## webpack如何优化构建速度和体积？
1. Tree Shaking 源码里没使用到的代码不打包，可以减少打包体积，加快速度
```shell
optimization: {
  usedExports: true,
  sideEffects: true
}

package.json
{
  sideEffects: ['*.css']
}
```

2. 懒加载
```js
import('lodash').then(_ => {
  _.debounce(fn)
})

const Foo = () => import('./Foo.vue')
```

3. code split 代码分割，优化构建速度
3.1 enter 手动分离入口文件
3.2 webpack 的 splitChunks
```js
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}

3.3 css split
plugins: [
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:6].css"
  })
]
```
3.4 file-loader
name: [path][contenthash].[ext]
=> hash值不变，浏览器可以使用缓存内容

3.5 url-loader
limit: 8 * 1024
小于阈值，会转换成base64，减少http请求数

## webpack 热更新原理 hmr
webpack-dev-server 基于express的web server, server 和 browser 之间维护了一个websocket， 当本地资源发生变化时，server会向browser 推送更新，并在带上构建时的hash， 在客户端与上一次资源进行对比。
```js
devServer: {
  hot: true
}
```
## proxy 
