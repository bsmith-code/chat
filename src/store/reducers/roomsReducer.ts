import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchRooms } from '../../models/room'
interface IRoom {
  id: string
  name: string
  type: boolean
}

interface IRoomsState {
  rooms: {
    data: IRoom[]
    isLoading: boolean
    error: Record<string, unknown>
  }
}
const initialState: IRoomsState = {
  rooms: {
    data: [],
    error: {},
    isLoading: false
  }
}

const getRooms = createAsyncThunk('rooms/getAllRooms', async () => {
  const response = await fetchRooms()
  return response
})

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: {
    [getRooms.pending.type]: state => {
      state.rooms = {
        data: [],
        error: {},
        isLoading: true
      }
    },
    [getRooms.fulfilled.type]: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [getRooms.rejected.type]: (state, action) => {
      state.rooms = {
        data: [],
        isLoading: false,
        error: action.payload
      }
    }
  }
})

export default roomsSlice.reducer
