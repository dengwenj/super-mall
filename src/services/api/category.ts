import request from ".."

// 获取全部分类
export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/home/category/head'
  })
}

export const getCategory = (id: string) => {
  return request({
    method: 'GET',
    url: '/category',
    params: {
      id
    }
  })
}

// 二级类目筛选条件
export const categorySubFilterById = (id: string) => {
  return request({
    method: 'GET',
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
