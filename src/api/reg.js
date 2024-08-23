// 导入request函数
import request from '@/utils/request'

// 请求注册
export const reguser = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}
