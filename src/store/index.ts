import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { appSlice } from 'store/client'
import { listenerMiddleware } from 'store/middleware'
import { authApi, chatApi } from 'store/server'

export const combinedReducers = combineReducers({
  app: appSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer
})

export const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(authApi.middleware, chatApi.middleware)
})
