## start
```
npm init -y
```
1. 修改package.json
```
+ "private":true 
- "main": "index.js" // 防止意外发布了代码
```
## init
npx webpack init
## importance
```js
entry: {
// 可以多个
},
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].bundle.js'
}
plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin()
]
```