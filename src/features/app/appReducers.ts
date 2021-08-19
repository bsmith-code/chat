import { PayloadAction } from '@reduxjs/toolkit'
import { IAppState } from './appState'
import { v4 as uuidv4 } from 'uuid'

export const reducers = {
  setAppError(state: IAppState, action: PayloadAction<string>): void {
    state.appNotifications = [
      ...state.appNotifications,
      { id: uuidv4(), type: 'error', message: action.payload }
    ]
  },
  setAppSuccess(state: IAppState, action: PayloadAction<string>): void {
    state.appNotifications = [
      ...state.appNotifications,
      { id: uuidv4(), type: 'success', message: action.payload }
    ]
  },
  setAppWarning(state: IAppState, action: PayloadAction<string>): void {
    state.appNotifications = [
      ...state.appNotifications,
      { id: uuidv4(), type: 'warning', message: action.payload }
    ]
  },
  dismissNotification(state: IAppState, action: PayloadAction<string>): void {
    const notifications = state.appNotifications.filter(
      notification => notification.id !== action.payload
    )
    state.appNotifications = notifications
  },
  clearAllNotifications(state: IAppState): void {
    state.appNotifications = []
  }
}
