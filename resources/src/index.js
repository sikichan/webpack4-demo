import _ from 'lodash'
import printMe from './print.js'
import '@/css/index.css'
import Avatar from '@/img/avatar.jpg'
import jsonData from '@/data/testjson.json'
import xmlData from '@/data/testxml.xml'

function component () {
  const div = document.createElement('div')
  div.innerHTML =  _.join(['Hello', 'Webpack', 4], ' ')
  div.className = 'div'
  const btn = document.createElement('button')
  btn.innerHTML = 'print'
  btn.onclick = printMe
  div.appendChild(btn)
  const img = new Image()
  img.src = Avatar
  div.appendChild(img)
  const i = document.createElement('span')
  i.className = 'icon iconfont'
  i.innerHTML = '&#xe8ab;'
  div.appendChild(i)
  return div
}
document.body.appendChild(component())

// .json - node.js内置支持
function readJSON() {
  document.body.innerHTML += '<br/>' + JSON.stringify(jsonData)
}
// .xml - 文件需要 xml-loader
function readXml() {
  document.body.innerHTML += '<br/>' + JSON.stringify(xmlData)
}
readJSON()
readXml()