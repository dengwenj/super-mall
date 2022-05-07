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
interface IAddressInfo extends IAddAddressF {
  id: string
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

export const updateAddress = (data: IAddressInfo) => {
  return request({
    method: 'PUT',
    url: `/member/address/${data.id}`,
    data
  })
}
