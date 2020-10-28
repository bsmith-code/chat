import { combineReducers } from 'redux'

import appReducers from './appReducers'
import authReducers from './authReducers'

const rootReducers = combineReducers({
  app: appReducers,
  auth: authReducers,
})

export default rootReducers
