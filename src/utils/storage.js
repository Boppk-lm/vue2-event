// 本地存储通用键名
const Token = 'lm_token'
// 设置本地存储
export const setToken = (token) => {
  localStorage.setItem(Token, JSON.stringify(token))
}
// 获取本地存储
export const getToken = () => {
  const result = localStorage.getItem(Token)
  return result ? JSON.parse(result) : ''
}
// 取消本地存储
export const removeToken = () => {
  localStorage.removeItem(Token)
}
