import request from ".."

export const getNewGoodsBySkuId = (skuId: string) => {
  return request({
    method: 'GET',
    url: `/goods/stock/${skuId}`
  })
}

export const getGoodsSku = (skuId: string) => {
  return request({
    method: 'GET',
    url: `/goods/sku/${skuId}`
  })
}
