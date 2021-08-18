import { login, getUserStatus } from './authThunks'
import { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { IAuthenticatedUser } from '../../types'
import { IAuthState } from './authState'

export const extraReducers = (
  builder: ActionReducerMapBuilder<IAuthState>
): void => {
  // Login
  builder
    .addCase(login.pending, state => {
      state.authenticatedUser = {
        data: {},
        isLoading: true
      }
    })
    .addCase(
      login.fulfilled,
      (state, action: PayloadAction<IAuthenticatedUser>) => {
        state.authenticatedUser = {
          isLoading: false,
          data: action.payload
        }
      }
    )
    .addCase(login.rejected, state => {
      state.authenticatedUser = {
        data: {},
        isLoading: false
      }
    })

  // User Status
  builder
    .addCase(getUserStatus.pending, state => {
      state.authenticatedUser = {
        data: {},
        isLoading: true
      }
    })
    .addCase(
      getUserStatus.fulfilled,
      (state, action: PayloadAction<IAuthenticatedUser>) => {
        state.authenticatedUser = {
          isLoading: false,
          data: action.payload
        }
      }
    )
    .addCase(getUserStatus.rejected, state => {
      state.authenticatedUser = {
        data: {},
        isLoading: false
      }
    })
}
