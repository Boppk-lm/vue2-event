// 导入request函数
import request from '@/utils/request'
// 获取用户信息数据
export const getUser = () => {
  return request.get('/my/userinfo')
}
// 获取侧边栏信息
export const getMenus = () => {
  return request.get('/my/menus')
}
