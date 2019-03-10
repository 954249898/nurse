import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import axios from 'axios';
import moment from 'moment'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.prototype.$moment = moment
Vue.prototype.$Host = 'http://localhost:3000/api'
Vue.prototype.$axios = axios
const router = new VueRouter({
  routes
})

//全局路由导航
router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  let user = JSON.parse(sessionStorage.getItem('USER-INFO'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

