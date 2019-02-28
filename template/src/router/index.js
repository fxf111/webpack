import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import config from '../../config'
const baseRoot = config.rootPath.slice(0, config.rootPath.length-1); //根

const Show = () =>
    import (/* webpackChunkName: "show" */'cmp/views/Show/Show');


export default new Router({
  base: baseRoot,
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/show'
    },
    {
      path: '/show',
      name: 'show',
      component: Show
    },    
  ]
})
