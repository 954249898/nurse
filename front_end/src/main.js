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
  let user = JSON.parse(sessionStorage.getItem('USER-INFO'));
  let role = user && user.role ? Number(user.role) : null
   //未登录为顾客情况（顾客不用登陆）
   if(to.path =='/customer'){
    next()
    return
  }
  //未登录情况
  if (!user && to.path != '/login') {
    next({ path: '/login' })
    return
  } 
  //登录情况
  if(user && role && to.path == '/login'){
    next({path:'/order'})
    return
  }
  //登录
  if(user && to.path != '/login' && to.path !='/error'){
    //护工
    if(role==2 && to.path!='/employee'){
      next({path:'/error'})
      return
    }
    // //顾客
    // if(role==3 && to.path!='customer'){
    //   next({path:'/customer'})
    //   return
    // }
    next()
    return
  }else{
    next()
    return
  }
 next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

