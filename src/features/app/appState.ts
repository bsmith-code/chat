export interface IAppState {
  isLoading: boolean
  appNotification: string
}

export const initialState: IAppState = {
  isLoading: false,
  appNotification: ''
}
