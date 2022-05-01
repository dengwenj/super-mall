import request from ".."

interface IGoodsRelevantParams {
  id?: string
  limit?: number
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
