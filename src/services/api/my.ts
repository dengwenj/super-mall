import request from ".."

export const getCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request({
    url: '/member/collect',
    method: 'get',
    params: { page, pageSize, collectType }
  })
}
