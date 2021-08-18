import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './appState'
import { reducers } from './appReducers'

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers
})
