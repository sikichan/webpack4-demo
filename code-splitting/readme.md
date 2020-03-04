## 代码分离
*代码分离是 把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，使用合理会极大影响加载时间。*

### 1. 入口起点
- entry入口配置手动分离chunk(块)
如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中

### 2. 防止重复
- CommonsChunkPlugin 去重和分离 chunk
CommonsChunkPlugin (v4已移除)插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
```js
new webpack.optimize.CommonsChunkPlugin({
  name: 'common' // 指定公共 bundle 的名称。
}) 
```

- SplitChunksPlugin 
```js
optimization.splitChunks.chunks: 'all' 
// 默认配置
/*
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
    default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
*/
```

### 3. 动态导入 
*动态代码拆分*
1. ES6的import()语法
<!-- 在旧有版本浏览器中使用 import()，记得使用 一个 polyfill 库（例如 es6-promise 或 promise-polyfill） -->
```js
// 1 
import(/*webpackChunkName: "lodash"*/'lodash').then(_ => {
    _.join([1,3], '-')
})
// 2 使用async/await ，需要安装插件
yarn add --dev @babel/plugin-syntax-dynamic-import

async function test() {
    const _ = await import(/*webpackChunkName: "lodash"*/'lodash')
    _.join([1,3], '-')
}
```
2. webpack特有的require.ensure 

