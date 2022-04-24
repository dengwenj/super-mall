interface IAllCategory {
  id?: string
  name: string
  picture?: string
  goods?: any[]
  children?: any[]
}

export interface ICategoryState {
  list: IAllCategory[]
}
