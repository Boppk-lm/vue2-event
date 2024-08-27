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
// 修改用户信息
export const updateUser = ({ id, username, email, nickname, user_pic }) => {
  return request.put('/my/userinfo', {
    id,
    username,
    nickname,
    email,
    user_pic
  })
}
// 更换用户头像
export const updateAvatar = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar
  })
}
