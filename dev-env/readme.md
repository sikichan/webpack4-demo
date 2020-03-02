## resources
*为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：*

### 配置module
#### 加载CSS

```
yarn add --dev style-loader css-loader
or
npm install  --save-dev style-loader css-loader
```


```js
 module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配.css结尾的文件
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
  ```

#### 加载图片
*现在我们正在下载 CSS，但是我们的背景和图标这些图片，要如何处理呢？使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中*
```
yarn add --dev file-loader
```

```js
rules: [
      {
        test: /\.(png|gif|jpeg|jpg|svg)$/i/, // /i结尾不区分大小
        use: [
          'file-loader'
        ]
      }
    ]
```