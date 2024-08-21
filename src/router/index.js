import Vue from 'vue'
import VueRouter from 'vue-router'
const register = () => import('@/view/register')
const login = () => import('@/view/login')
Vue.use(VueRouter)

const routes = [
  {
    // 注册路由 懒加载
    path: '/reg',
    component: register
  },
  {
    // 登录路由 懒加载
    path: '/log',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
