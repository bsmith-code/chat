import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import app from '../features/app'
import auth from '../features/auth'
import rooms from '../features/rooms'

const reducer = {
  app,
  auth,
  rooms
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

export default store
