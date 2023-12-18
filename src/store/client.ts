import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  darkTheme,
  getStoredTheme,
  getSystemPreference,
  lightTheme
} from 'themes'
import uniqid from 'uniqid'

import { TAB_ROOMS } from 'constants/tabs'
import {
  THEME_DARK_VALUE,
  THEME_LIGHT_VALUE,
  THEME_SYSTEM_VALUE
} from 'constants/theme'

import { IAppState, TTab, TTheme } from 'types/app'
import { IRootState } from 'types/redux'

const initialState: IAppState = {
  theme: getStoredTheme() ?? 'system',
  currentTab: 'rooms',
  currentRoomId: '',
  notifications: {}
}

const reducers = {
  updateCurrentTab: (state: IAppState, { payload }: PayloadAction<TTab>) => {
    state.currentTab = payload
  },
  updateTheme: (state: IAppState, { payload }: PayloadAction<TTheme>) => {
    state.theme = payload
  },
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
  actions: {
    updateTheme,
    updateCurrentTab,
    createNotification,
    removeNotification,
    updateCurrentRoomId
  }
} = appSlice

export const selectCurrentTab = (state: IRootState) =>
  state?.app?.currentTab ?? TAB_ROOMS

export const selectCurrentRoomId = (state: IRootState) =>
  state?.app?.currentRoomId ?? ''

export const selectNotifications = (state: IRootState) =>
  state?.app?.notifications ?? []

export const selectTheme = (state: IRootState) => state?.app?.theme ?? ''
export const selectMuiTheme = (state: IRootState) => {
  const theme = selectTheme(state)

  const themeMap = {
    [THEME_LIGHT_VALUE]: lightTheme,
    [THEME_DARK_VALUE]: darkTheme,
    [THEME_SYSTEM_VALUE]: getSystemPreference()
  }

  return themeMap[theme] ?? themeMap[THEME_SYSTEM_VALUE]
}
