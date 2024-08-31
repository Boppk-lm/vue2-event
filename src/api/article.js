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

// 修改文章数据
export const updatearticle = ({ cate_name, cate_alias, id }) => {
  return request.put('/my/cate/info', {
    id,
    cate_name,
    cate_alias
  })
}
// 删除文章数据
export const deletearticle = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
// 发表文章 传入FormDate类型
export const uploadarticle = (fd) => {
  return request.post('/my/article/add',
    fd
  )
}

// 获取文章列表
export const getarticlelist = ({ pagenum, pagesize, cate_id, state }) => {
  return request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

// 获取文章详情
export const getartdetail = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}
// 删除文章
export const removeartdetail = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id
    }
  })
}
