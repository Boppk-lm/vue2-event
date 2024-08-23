// 导入request函数
import request from '@/utils/request'

// 请求登录
export const loguser = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}
