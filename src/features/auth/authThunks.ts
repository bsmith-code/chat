import { createAsyncThunk } from '@reduxjs/toolkit'
import { postLogin, fetchUserStatus } from '../../models/auth'
import { IAuthenticatedUser } from '../../types'

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    return (await postLogin(username, password)) as IAuthenticatedUser
  }
)
export const getUserStatus = createAsyncThunk(
  'auth/getUserStatus',
  async () => {
    return (await fetchUserStatus()) as IAuthenticatedUser
  }
)
