import Vue from 'vue'
import VueRouter from 'vue-router'
const register = () => import('@/view/register')
const login = () => import('@/view/login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // 注册路由 懒加载
    path: '/register',
    component: register
  },
  {
    // 登录路由 懒加载
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
