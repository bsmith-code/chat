import {
  putJoinRoom,
  fetchRoomById,
  fetchUserRooms,
  postCreateRoom,
  fetchRoomMembers,
  fetchRoomMessages,
  socketCreateMessage,
  fetchRoomMemberStatus
} from '../../models/rooms'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRoom, IMember, IMessage } from '../../types'
import { IRootState } from '../../store'

const selectUserId = (state: IRootState) =>
  state?.auth?.authenticatedUser?.data?.id ?? ''
const selectRoomId = (state: IRootState) =>
  state?.rooms?.currentRoom?.data?.id ?? ''

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
  async (_, { getState }) => {
    const roomId = selectRoomId(getState() as IRootState)

    return (await fetchRoomMemberStatus(roomId)) as IMember
  }
)

export const getRoomMembers = createAsyncThunk(
  'rooms/getRoomMembers',
  async (_, { getState }) => {
    const roomId = selectRoomId(getState() as IRootState)

    return (await fetchRoomMembers(roomId)) as { [key: string]: IMember[] }
  }
)

export const getRoomMessages = createAsyncThunk(
  'rooms/getRoomMessages',
  async (_, { getState }) => {
    const roomId = selectRoomId(getState() as IRootState)

    return (await fetchRoomMessages(roomId)) as IMessage[]
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
  async (_, { getState }) => {
    const roomId = selectRoomId(getState() as IRootState)

    return (await putJoinRoom(roomId)) as IMember
  }
)

export const createMessage = createAsyncThunk(
  'rooms/createMessage',
  async (message: string, { getState }) => {
    const state = getState() as IRootState
    const userId = selectUserId(state)
    const roomId = selectRoomId(state)

    await socketCreateMessage({ userId, roomId, message })
  }
)
