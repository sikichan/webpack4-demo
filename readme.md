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

