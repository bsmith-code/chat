import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import io from 'socket.io-client'

import { useAppSelector } from 'hooks/useRedux'

import { IRootState } from 'types/redux'
import {
  IMessage,
  IMessageCreate,
  IRoom,
  IRoomCreate,
  IRoomUpdate,
  IUser
} from 'types/room'

const baseUrl = process.env?.REACT_APP_API_BASE_URL ?? ''

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/v1/auth`,
    credentials: 'include'
  }),
  endpoints: build => ({
    session: build.query<IUser, void>({
      query: () => 'session'
    }),
    getUsers: build.query<IUser[], void>({
      query: () => 'users'
    })
  })
})

export const { useSessionQuery, useGetUsersQuery } = authApi

export const selectUser = (state: IRootState) =>
  authApi.endpoints.session.select()(state).data ?? ({} as IUser)

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/v1/chat`,
    credentials: 'include'
  }),
  tagTypes: ['IRoom'],
  endpoints: build => ({
    getRooms: build.query<IRoom[], string>({
      query: () => 'rooms',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(baseUrl)

        try {
          await cacheDataLoaded

          const listener = (room: IRoom) => {
            if (!room.members.find(({ id }) => id === arg)) return

            updateCachedData(draft => {
              draft.push(room)
            })
          }

          socket.on('createRoom', listener)
        } catch (error) {
          console.error(error)
        }

        await cacheEntryRemoved
        socket.close()
      }
    }),
    createRoom: build.mutation<IRoom, IRoomCreate>({
      query: body => ({
        url: 'rooms',
        method: 'POST',
        body
      })
    }),
    updateRoom: build.mutation<IRoom, IRoomUpdate>({
      query: body => ({
        url: `rooms`,
        method: 'PUT',
        body
      })
    }),
    getRoomMessages: build.query<IMessage[], string>({
      query: id => `rooms/${id}/messages`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(baseUrl)

        try {
          await cacheDataLoaded

          const listener = (message: IMessage) => {
            if (message.roomId !== arg) return

            updateCachedData(draft => {
              draft.push(message)
            })
          }

          socket.on('createMessage', listener)
        } catch (error) {
          console.error(error)
        }

        await cacheEntryRemoved
        socket.close()
      }
    }),
    createMessage: build.mutation<IMessage, IMessageCreate>({
      query: body => ({
        url: `messages`,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useCreateMessageMutation,
  useGetRoomMessagesQuery
} = chatApi
