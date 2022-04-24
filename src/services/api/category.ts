import request from ".."

// 获取全部分类
export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/home/category/head'
  })
}
