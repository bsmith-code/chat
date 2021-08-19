import { appSlice } from './appSlice'

export const {
  setAppError,
  setAppSuccess,
  setAppWarning,
  dismissNotification,
  clearAllNotifications
} = appSlice.actions
export default appSlice.reducer
