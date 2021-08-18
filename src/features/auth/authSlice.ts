import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './authState'
import { extraReducers } from './authReducers'

export const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers
})
