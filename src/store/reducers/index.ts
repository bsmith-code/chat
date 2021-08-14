import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import authReducer from './authReducer'
import roomsReducer from './roomsReducer'

export default combineReducers({ appReducer, authReducer, roomsReducer })
