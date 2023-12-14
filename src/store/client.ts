import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import uniqid from 'uniqid'

import { IRootState } from 'types/redux'

interface IAppState {
  currentRoomId: string
  notifications: Record<string, string>
}

const initialState: IAppState = {
  currentRoomId: '',
  notifications: {}
}

const reducers = {
  updateCurrentRoomId: (
    state: IAppState,
    { payload }: PayloadAction<string>
  ) => {
    state.currentRoomId = payload
  },
  createNotification: (
    state: IAppState,
    { payload }: PayloadAction<string>
  ) => {
    state.notifications = {
      [uniqid()]: payload ?? ''
    }
  },
  removeNotification: (
    state: IAppState,
    { payload }: PayloadAction<string>
  ) => {
    delete state.notifications[payload]
  }
}

export const appSlice = createSlice({
  name: 'app',
  reducers,
  initialState
})

export const {
  actions: { updateCurrentRoomId, createNotification, removeNotification }
} = appSlice

export const selectCurrentRoomId = (state: IRootState) =>
  state?.app?.currentRoomId ?? ''

export const selectNotifications = (state: IRootState) =>
  state?.app?.notifications ?? []
