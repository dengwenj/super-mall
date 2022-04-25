import request from ".."

export const getBrand = () => {
  return request({
    method: 'GET',
    url: '/home/brand',
    params: {
      limit: 6
    }
  })
}

export const getBanner = () => {
  return request({
    method: 'GET',
    url: '/home/banner'
  })
}

export const getNew = () => {
  return request({
    method: 'GET',
    url: 'home/new'
  })
}

export const getHot = () => {
  return request({
    method: 'GET',
    url: 'home/hot'
  })
}
