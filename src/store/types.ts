import type { IUserState } from './modules/user/types'
import type { ICartState } from './modules/cart/types'
import type { ICategoryState } from './modules/category/types'

export interface IRootState {
  count: number
}

export interface IModuleState {
  user: IUserState,
  cart: ICartState,
  category: ICategoryState 
}

export type IStore = IRootState & IModuleState
