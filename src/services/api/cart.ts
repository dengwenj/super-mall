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

export const mergeCartGoods = (goodsList: { skuId: string, selected: boolean, count: number }[]) => {
  return request({
    method: 'POST',
    url: '/member/cart/merge',
    data: goodsList
  })
}

export const getCartList = () => {
  return request({
    method: 'GET',
    url: '/member/cart'
  })
}
