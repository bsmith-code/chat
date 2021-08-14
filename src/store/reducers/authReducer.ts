import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserStatus, postLogin } from '../../models/auth'

interface IAuthenticatedUser {
  id: string
  email: string
  lastName: string
  username: string
  firstName: string
}

interface IAuthState {
  authenticatedUser: {
    isLoading: boolean
    error: Record<string, unknown>
    data: IAuthenticatedUser | null
  }
}

const initialState: IAuthState = {
  authenticatedUser: {
    error: {},
    data: null,
    isLoading: false
  }
}

// API Calls
const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await postLogin(username, password)
    return response
  }
)
const getUserStatus = createAsyncThunk('auth/getUserStatus', async () => {
  const response = await fetchUserStatus()
  return response
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Login
    [login.pending.type]: state => {
      state.authenticatedUser = {
        data: null,
        error: {},
        isLoading: true
      }
    },
    [login.fulfilled.type]: (
      state,
      action: PayloadAction<IAuthenticatedUser>
    ) => {
      state.authenticatedUser = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [login.rejected.type]: (state, action) => {
      state.authenticatedUser = {
        data: null,
        isLoading: false,
        error: action.payload
      }
    },

    // Get User Status
    [getUserStatus.pending.type]: state => {
      state.authenticatedUser = {
        data: null,
        error: {},
        isLoading: true
      }
    },
    [getUserStatus.fulfilled.type]: (
      state,
      action: PayloadAction<IAuthenticatedUser>
    ) => {
      state.authenticatedUser = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [getUserStatus.rejected.type]: (state, action) => {
      state.authenticatedUser = {
        data: null,
        isLoading: false,
        error: action.payload
      }
    }
  }
})

export default authSlice.reducer
