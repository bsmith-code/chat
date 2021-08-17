import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  putJoinRoom,
  fetchRoomById,
  fetchUserRooms,
  postCreateRoom,
  fetchRoomMemberStatus
} from '../../models/room'
import { IRoom, IMember } from '../../types'

interface IRoomsState {
  currentRoomId: string
  currentRoom: {
    data: IRoom
    isLoading: boolean
    error: Record<string, unknown>
  }
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
  currentRoom: {
    data: {},
    error: {},
    isLoading: false
  },
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
export const getRoomById = createAsyncThunk(
  'rooms/getRoomById',
  async (roomId: string) => {
    return (await fetchRoomById(roomId)) as IRoom
  }
)

export const getUserRooms = createAsyncThunk('rooms/getUserRooms', async () => {
  return (await fetchUserRooms()) as IRoom[]
})

export const getRoomMemberStatus = createAsyncThunk(
  'rooms/getRoomMemberStatus',
  async (roomId: string) => {
    return (await fetchRoomMemberStatus(roomId)) as IMember
  }
)

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (jsonData: { name: string; users: string[] }) => {
    return (await postCreateRoom(jsonData)) as IRoom
  }
)

export const joinRoom = createAsyncThunk(
  'rooms/joinRoom',
  async (roomId: string) => {
    return (await putJoinRoom(roomId)) as IMember
  }
)

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setCurrentRoomId(state, action: PayloadAction<string>) {
      state.currentRoomId = action.payload
    }
  },
  extraReducers: {
    // Get Room by ID
    [getRoomById.pending.type]: state => {
      state.currentRoom = {
        data: {},
        error: {},
        isLoading: true
      }
    },
    [getRoomById.fulfilled.type]: (state, action: PayloadAction<IRoom>) => {
      state.currentRoom = {
        error: {},
        isLoading: false,
        data: action.payload
      }
    },
    [getRoomById.rejected.type]: (state, action) => {
      state.currentRoom = {
        data: {},
        isLoading: false,
        error: action.payload
      }
    },

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

export const { setCurrentRoomId } = roomsSlice.actions
export default roomsSlice.reducer
