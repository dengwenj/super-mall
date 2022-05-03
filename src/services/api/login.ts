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

export const mobileMessage = (mobile: string) => {
  return request({
    method: 'GET',
    url: '/login/code',
    params: {
      mobile
    }
  })
}

export const QQLogin = (data: { unionId: string, source: number }) => {
  return request({
    method: 'POST',
    url: '/login/social',
    data
  })
}

export const QQLoginBindCode = (mobile: string) => {
  return request({
    method: 'GET',
    url: '/login/social/code',
    params: {
      mobile
    }
  })
}

export const QQLoginBind = (data: { unionId: string, mobile: string, code: string }) => {
  return request({
    method: 'POST',
    url: '/login/social/bind',
    data
  })
}

export const QQUnBind = (mobile: string) => {
  return request({
    method: 'GET',
    url: '/login/social/unbind',
    params: {
      mobile
    }
  })
}

export const checkOnly = (account: string) => {
  return request({
    method: 'GET',
    url: '/register/check',
    params: {
      account
    }
  })
}
