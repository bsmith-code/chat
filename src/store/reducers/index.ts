import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import authReducer from './authReducer'
import roomReducer from './roomReducer'

export default combineReducers({ appReducer, authReducer, roomReducer })
