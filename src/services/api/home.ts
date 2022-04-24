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
