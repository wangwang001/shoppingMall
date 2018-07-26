import Vue from 'vue'
import Router from 'vue-router'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import Home from '../pages/Home'
import filterSort from '@/components/filterSort'
import Detail from '@/components/Detail'
import Search from '../pages/Search'
import docDetail from '@/pages/docDetail'
import '../assets/css/loaders.css';
import '../assets/css/style.css'
Vue.use(Router);
Vue.use(Vant);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/filterSort',
      name: 'filterSort',
      component: filterSort
    },
    {
      path: '/Detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/docDetail',
      name: 'docDetail',
      component: docDetail
    }
  ]
})
