import {
  putJoinRoom,
  fetchRoomById,
  fetchUserRooms,
  postCreateRoom,
  fetchRoomMembers,
  fetchRoomMessages,
  fetchRoomMemberStatus
} from '../../models/rooms'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRoom, IMember, IMessage } from '../../types'

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

export const getRoomMembers = createAsyncThunk(
  'rooms/getRoomMembers',
  async (roomId: string) => {
    return (await fetchRoomMembers(roomId)) as IMember[]
  }
)

export const getRoomMessages = createAsyncThunk(
  'rooms/getRoomMessages',
  async (roomId: string) => {
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
  async (roomId: string) => {
    return (await putJoinRoom(roomId)) as IMember
  }
)
