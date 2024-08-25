// 导入request函数
import request from '@/utils/request'

import store from '@/store'
// 获取用户信息数据
export const getUser = () => {
  return request.get('/my/userinfo', {
    headers: {
      Authorization: store.state.token
    }
  })
}
// 获取侧边栏信息
export const getMenus = () => {
  return request.get('/my/menus', {
    headers: {
      Authorization: store.state.token
    }
  })
}
