import request from ".."

export const getNewGoodsBySkuId = (skuId: string) => {
  return request({
    method: 'GET',
    url: `/goods/stock/${skuId}`
  })
}
