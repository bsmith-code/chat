import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import reducer from './slices'

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
