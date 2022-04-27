interface IAllCategory {
  id?: string
  name: string
  picture?: string
  goods?: any[]
  children?: any[]
}

export interface ICategoryState {
  categoryId: string
  list: IAllCategory[],
  listNameSubNameAndId: {
    listName?: string
    subName?: string
    subId?: string
    listId?: string
  },
  categorySubFilter: {
    brands?: any[]
    saleProperties?: any[]
  }
}
