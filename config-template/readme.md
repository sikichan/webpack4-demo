# 文件资源缓存

## hash
webpack每次打包构建都重新产生一个 hash 值，会导致之前所有缓存失效

## chunkhash
根据同一个 chunk 来产生同一个 hash 值，所有根据入口文件引入的都属于同个 chunk，它们的 hash 值一样

## contenthash (推荐使用)
根据文件内容产生的 hash 值，不同文件 hash 值就不一样
[contenthash:6] 是取 hash 值的前 6 位

# tree-shaking 删除无用代码
可以减少打包后的代码体积

## 前提
1. 使用 ESModule 
2. 开启 production 模式

## 注意
? package.json中的 "sideEffects": false ，表示所有代码都无副作用，此时tree-shaking可能会删除掉那些只引入了但是没有使用代码，比如 import '@babel/polyfill' or import './index.css'
? 解决方法：
"sideEffects": [
  '*.css',
  '@babel/polyfill'
]

# code-split 代码分割
1. 手动配置多入口，output使用[name]占位符

2. 'production' && optimization.splitChunks.chunks: 'all'
2.1 此配置会将 node_modules 中代码单独打包成一个chunk来输出
2.2 此配置会自动分析多入口文件中是否有公共引入文件，有则打包成单独的 chunk，而不是重复打包

3. 使用 import 动态导入
```js
import(/*webpackChunkName: 'math'*/'./math.js').then(({add}) => (console.log(add(1,4))))
```

# 懒加载 vs 预加载

## 正常加载
并行加载，同一时间加载多个文件

## 懒加载 
当文件需要时才去加载
```js
/* webpackChunkName: '' */
```
## 预加载 
在使用文件之前提前加载，并且是会等其他资源加载完毕，等浏览器空闲了才去提前加载
```js
/* webpackChunkName: '', webpackPrefetch: true */
```