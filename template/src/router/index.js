import Vue from 'vue'
import Router from 'vue-router'

import config from '../../config'
const baseRoot = config.rootPath.slice(0, config.rootPath.length-1); //根

import Show from '@/components/views/Show/Show.vue'

Vue.use(Router)

export default new Router({
  base: baseRoot,
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/show'
    },
    {
      path: '/',
      name: 'show',
      component: Show
    },    
  ]
})
