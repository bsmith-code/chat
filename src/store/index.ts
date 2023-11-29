import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { middleware, reducer, reducerPath } from 'store/server'

export const combinedReducers = combineReducers({
  [reducerPath]: reducer
})

const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware)
})

export default store
