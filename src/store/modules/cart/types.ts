export interface IListItem {
  skuId: string
  attrsText: string
  id: string
  stock: number
  count: number
  isEffective: boolean
  selected: boolean
  price: string
  nowPrice: string
  name: string
  picture: string
}

export interface ICartState {
  list: IListItem[]
}
