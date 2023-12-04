import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IRootState } from 'types/redux'

interface IAppState {
  currentRoomId: string
}
const initialState: IAppState = {
  currentRoomId: ''
}

const reducers = {
  updateCurrentRoomId: (
    state: IAppState,
    { payload }: PayloadAction<string>
  ) => {
    state.currentRoomId = payload
  }
}

export const appSlice = createSlice({
  name: 'app',
  reducers,
  initialState
})

export const {
  actions: { updateCurrentRoomId }
} = appSlice

export const selectCurrentRoomId = (state: IRootState) =>
  state?.app?.currentRoomId ?? ''
