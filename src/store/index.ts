import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authApi, chatApi } from 'store/server'

export const combinedReducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer
})

const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, chatApi.middleware)
})

export default store
