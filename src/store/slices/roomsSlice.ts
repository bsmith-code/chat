import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchRoomMemberStatus,
  fetchUserRooms,
  postCreateRoom
} from '../../models/room'

//Types
export interface IRoom {
  id: string
  name: string
  type: boolean
}

export interface IMember {
  id?: string
  userId?: string
  roomId?: string
  invitedAt?: string
  acceptedAt?: string | null
}

export interface IRoomsState {
  currentRoomId: string
  memberStatus: {
    data: IMember
    isLoading: boolean
    error: Record<string, unknown>
  }
  userRooms: {
    data: IRoom[]
    isLoading: boolean
    error: Record<string, unknown>
  }
}

export const initialState: IRoomsState = {
  currentRoomId: '',
  userRooms: {
    data: [],
    error: {},
    isLoading: false
  },
  memberStatus: {
    data: {},
    error: {},
    isLoading: false
  }
}

// API Calls
export const getUserRooms = createAsyncThunk('rooms/getUserRooms', async () => {
  const response = await fetchUserRooms()
  return response
})

export const getRoomMemberStatus = createAsyncThunk(
  'rooms/getRoomMemberStatus',
  async (roomId: string) => {
    const response = await fetchRoomMemberStatus(roomId)
    return response
  }
)

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (jsonData: { name: string; users: string[] }) => {
    await postCreateRoom(jsonData)
  }
)

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setcurrentRoomId(state, action: PayloadAction<string>) {
      state.currentRoomId = action.payload
    }
  },
  extraReducers: {
    // Get User Rooms
    [getUserRooms.pending.type]: state => {
      state.userRooms = {
        data: [],
        error: {},
        isLoading: true
      }
    },
    [getUserRooms.fulfilled.type]: (state, action: PayloadAction<IRoom[]>) => {
      state.userRooms = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [getUserRooms.rejected.type]: (state, action) => {
      state.userRooms = {
        data: [],
        isLoading: false,
        error: action.payload
      }
    },

    // Get Room Member Status
    [getRoomMemberStatus.pending.type]: state => {
      state.memberStatus = {
        data: {},
        error: {},
        isLoading: true
      }
    },
    [getRoomMemberStatus.fulfilled.type]: (
      state,
      action: PayloadAction<IMember>
    ) => {
      state.memberStatus = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [getRoomMemberStatus.rejected.type]: (state, action) => {
      state.memberStatus = {
        data: {},
        isLoading: false,
        error: action.payload
      }
    }
  }
})

export const { setcurrentRoomId } = roomsSlice.actions
export default roomsSlice.reducer
