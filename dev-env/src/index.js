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
document.body.appendChild(component())