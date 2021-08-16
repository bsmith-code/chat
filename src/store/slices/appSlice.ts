import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface IAppState {
  isLoading: boolean
  appNotification: string
}
const initialState: IAppState = {
  isLoading: false,
  appNotification: ''
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppNotfication(state, action: PayloadAction<string>) {
      state.appNotification = action.payload
    },
    setAppIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    }
  }
})

export const { setAppNotfication, setAppIsLoading } = appSlice.actions
export default appSlice.reducer
