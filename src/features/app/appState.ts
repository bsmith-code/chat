export interface IAppNotification {
  id: string
  type: string
  message: string
}
export interface IAppState {
  appNotifications: IAppNotification[]
}

export const initialState: IAppState = {
  appNotifications: []
}
