import request from ".."

export const accountLogin = (data: {
  account?: string
  password?: string
}) => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

export const mobileLogin = (data: {
  mobile?: string
  code?: string
}) => {
  return request({
    method: 'POST',
    url: '/login/code',
    data
  })
}
