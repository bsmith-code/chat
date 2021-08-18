import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './roomsState'
import { reducers, extraReducers } from './roomsReducers'

export const roomsSlice = createSlice({
  name: 'rooms',
  reducers,
  initialState,
  extraReducers
})
