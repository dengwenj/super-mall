export interface IUserState {
  profile: {
    id: number | null,
    avatar: string,
    nickname: string,
    account: string,
    mobile: number | null,
    token: string
  }
}
