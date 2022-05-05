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

export const addCartGoods = (data: { skuId: string, count: number }) => {
  return request({
    method: 'POST',
    url: '/member/cart',
    data
  })
}

export const removeCartGoods = (data: { ids?: string[], clearInvalid?: boolean }) => {
  return request({
    method: 'DELETE',
    url: '/member/cart',
    data
  })
}

export const updateCartGoods = (skuId: string, data: { selected?: boolean, count?: number }) => {
  return request({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data
  })
}

export const allCheckSelected = (data: { selected: boolean, ids: string[] }) => {
  return request({
    method: 'PUT',
    url: '/member/cart/selected',
    data
  })
}
