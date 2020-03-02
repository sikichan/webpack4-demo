import printMe from './print.js'

function component () {
  const div = document.createElement('div')
  // div.innerHTML =  _.join(['Hello', 'Webpack', 4], ' ')
  const btn = document.createElement('button')
  btn.innerHTML = 'print'
  btn.onclick = printMe
  div.appendChild(btn)
  return div
}
let ele = component()
document.body.appendChild(ele)

// 接受(accept)给定依赖模块的更新，并触发一个 回调函数 来对这些更新做出响应
if (module.hot) {
  console.log('模块热替换')
  module.hot.accept('./print.js', function () {
    console.log('使用更新过的 print 模块执行某些操作...')
    ele = component()
    document.body.appendChild(ele)
  })
}