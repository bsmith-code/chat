import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllRooms } from '../../models/room'
export interface IRoom {
  id: string
  name: string
  type: boolean
}

interface IRoomsState {
  allRooms: {
    data: IRoom[]
    isLoading: boolean
    error: Record<string, unknown>
  }
}
const initialState: IRoomsState = {
  allRooms: {
    data: [],
    error: {},
    isLoading: false
  }
}

// API Calls
export const getAllRooms = createAsyncThunk('rooms/getAllRooms', async () => {
  const response = await fetchAllRooms()
  return response
})

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllRooms.pending.type]: state => {
      state.allRooms = {
        data: [],
        error: {},
        isLoading: true
      }
    },
    [getAllRooms.fulfilled.type]: (state, action: PayloadAction<IRoom[]>) => {
      state.allRooms = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [getAllRooms.rejected.type]: (state, action) => {
      state.allRooms = {
        data: [],
        isLoading: false,
        error: action.payload
      }
    }
  }
})

export default roomsSlice.reducer
