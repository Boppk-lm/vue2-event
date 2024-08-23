import axios from 'axios'

// 创建axios实例 设置基地址
const myaxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const res = response.data
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default myaxios
