import request from ".."

interface IGoodsRelevantParams {
  id?: string
  limit?: number
}

interface IGoodsEvaluatePageParams {
  page: number
  pageSize: number
  hasPicture?: boolean
  tag?: string
  sortField?: any
  sortMethod?: any
}

export const getGoods = (id: string) => {
  return request({
    method: 'GET',
    url: '/goods',
    params: {
      id
    }
  })
}

export const getGoodsRelevant = (params?: IGoodsRelevantParams) => {
  return request({
    method: 'GET',
    url: '/goods/relevant',
    params
  })
}

export const getGoodsHot = (params: {id: string, limit: number, type: number}) => {
  return request({
    method: 'GET',
    url: '/goods/hot',
    params
  })
}

// export const getGoodsComment = (id: string) => {
//   return request({
//     method: 'GET',
//     url: `/goods/${id}/evaluate`
//   })
// }

export const getGoodsEvaluatePage = (id: string, params: IGoodsEvaluatePageParams) => {
  return request({
    method: 'GET',
    url: `/goods/${id}/evaluate/page`,
    params
  })
}
