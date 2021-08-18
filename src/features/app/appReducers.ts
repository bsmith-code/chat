import { PayloadAction } from '@reduxjs/toolkit'
import { IAppState } from './appState'

export const reducers = {
  setAppNotfication(state: IAppState, action: PayloadAction<string>): void {
    state.appNotification = action.payload
  },
  setAppIsLoading(state: IAppState, action: PayloadAction<boolean>): void {
    state.isLoading = action.payload
  }
}
