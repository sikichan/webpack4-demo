function component() {
  // 在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js ，而不是 [id].bundle.js 
  return import(/*webpackChunkName: "lodash"*/'lodash').then(_ => {
    let ele = document.createElement('div')
    ele.innerHTML = _.join(['webpackChunkName', 'lodash', ], ': ')
    return ele
  })
}

component().then(com => {
  document.body.appendChild(com)
})


async function getComponent() {
  const _ = await import(/*webpackChunkName: "lodash"*/'lodash')
  let ele = document.createElement('div')
  ele.innerHTML = _.join(['@babel/plugin', 'syntax', 'dynamic', 'import'], '-')
  return ele
}
getComponent().then(com => {
  document.body.appendChild(com)
})