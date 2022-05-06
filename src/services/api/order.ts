import request from ".."

export const createOrder = () => {
  return request({
    method: 'GET',
    url: '/member/order/pre'
  })
}
