import request from ".."

export const getBrand = (limit: number) => {
  return request({
    method: 'GET',
    url: '/home/brand',
    params: {
      limit
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

export const getGoods = () => {
  return request({
    method: 'GET',
    url: 'home/goods'
  })
}

export const getSpecial = () => {
  return request({
    method: 'GET',
    url: '/home/special'
  })
}
