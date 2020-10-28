import { combineReducers } from 'redux'

import appReducers from './appReducers'
import authReducers from './authReducers'
import roomReducers from './roomReducers'

const rootReducers = combineReducers({
  app: appReducers,
  auth: authReducers,
  room: roomReducers,
})

export default rootReducers
