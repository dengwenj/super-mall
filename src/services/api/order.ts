import request from ".."

interface ISubmitOrderProps {
  goods: { skuId: string, count: number }[]
  addressId: string
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage: string
}

export const createOrder = () => {
  return request({
    method: 'GET',
    url: '/member/order/pre'
  })
}

export const submitOrder = (data: ISubmitOrderProps) => {
  return request({
    method: 'POST',
    url: '/member/order',
    data
  })
}

export const getOrderDetail = (id: string) => {
  return request({
    method: 'GET',
    url: `/member/order/${id}`
  })
}

export const closeOrder = (id: string, cancelReason: string = '超时了') => {
  return request({
    method: 'PUT',
    url: `/member/order/${id}/cancel`,
    data: {
      cancelReason
    }
  })
}

export const getMyOrder = (params: { page: number, pageSize: number, orderState?: number }) => {
  return request({
    method: 'GET',
    url: '/member/order',
    params
  })
}

export const deleteOrder = (ids: string[]) => {
  return request({
    method: 'DELETE',
    url: '/member/order',
    data: {
      ids
    }
  })
}

export const orderLogistics = (id: string) => {
  return request({
    method: 'GET',
    url: `/member/order/${id}/logistics`
  })
}
