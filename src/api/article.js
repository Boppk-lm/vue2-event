// 导入request函数
import request from '@/utils/request'

// 请求文章数据
export const getarticle = () => {
  return request.get('/my/cate/list')
}

// 新增文章数据
export const addarticle = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}
