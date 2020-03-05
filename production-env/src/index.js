import {cube} from '@/math'
require('@/assets/less/style.less')
function component() {
  var div = document.createElement('div')
  div.innerHTML = 'hello'
  return div
}
let a = () => (console.error('ddcdddfsfsdfsdfssdfsdfsfdcd'))
document.body.appendChild(component())
a()
console.log('cube: ', cube(3))
