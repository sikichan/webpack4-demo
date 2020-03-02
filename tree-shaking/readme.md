## tree shaking (术语)
*用于移除JavaScript上下文中未引用的代码*
### 通过 package.json 的 "sideEffects" 属性

```js
// 如果所有代码都不包含副作用,它可以安全地删除未用到的 export 导出
"sideEffects": false
```

### 修改webpack.config.js 的 mode 
```js
// 启用 uglifyjs 压缩插件,在bundle中删除(dead code)未使用代码
mode: 'production' 
```