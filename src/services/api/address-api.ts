import request from ".."

export interface IAddAddressF {
  receiver: string
  contact: string
  provinceCode?: string
  cityCode?: string
  countyCode?: string
  address: string
  postalCode: string
  addressTags: string
  fullLocation?: string
  isDefault?: number
}

export const addAddress = (data: IAddAddressF) => {
  return request({
    method: 'POST',
    url: '/member/address',
    data
  })
}

export const getAddress = () => {
  return request({
    method: 'GET',
    url: '/member/address'
  })
}
