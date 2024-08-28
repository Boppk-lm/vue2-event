import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { removeToken } from './storage'

// 创建axios实例 设置基地址
const myaxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加表头headers
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
myaxios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 如果token过期 清除vuex和本地中的数据并跳转到登录页面
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    removeToken()
    store.commit('updateuser', {})
    router.push('/login')
    return Message.error('登录已过期，请重新登录')
  }
  return Promise.reject(error)
})

// 导出配置好的实例
export default myaxios
