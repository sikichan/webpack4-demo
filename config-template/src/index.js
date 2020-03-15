import '$styles/style'
import {add} from './math'
/**
 * 这是注释1
 */
console.log(add(1,3,4))
import(/*webpackChunkName: 'lodash'*/'lodash').then(({join}) => {
  console.log('join: ', join([2,4], '^'))
})