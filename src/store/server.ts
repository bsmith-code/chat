import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import io, { Socket } from 'socket.io-client'

import { IRootState } from 'types/redux'
import { IMessage, IMessageCreate, IRoom, IRoomForm, IUser } from 'types/room'

const baseUrl = process.env?.REACT_APP_API_BASE_URL ?? ''
let socket: Socket | undefined

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/v1/auth`,
    credentials: 'include'
  }),
  endpoints: build => ({
    session: build.query<IUser, void>({
      query: () => 'session',
      onCacheEntryAdded: async (_, { cacheEntryRemoved }) => {
        socket = io(baseUrl)

        await cacheEntryRemoved
        socket.close()
      }
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
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded }) {
        if (!socket) return
        try {
          await cacheDataLoaded

          const createListener = (room: IRoom) => {
            if (!room.members.find(({ id }) => id === arg)) return

            updateCachedData(draft => {
              draft.push(room)
            })
          }
          const updateRoomListener = (room: IRoom) => {
            updateCachedData(draft => {
              if (!room.members.find(({ id }) => id === arg)) {
                draft.splice(
                  draft.findIndex(({ id }) => id === room.id),
                  1
                )
              } else {
                const draftRoom = draft.find(({ id }) => id === room.id)

                if (draftRoom) {
                  Object.assign(draftRoom, room)
                } else {
                  draft.push(room)
                }
              }
            })
          }

          const createMessageListener = (message: IMessage) => {
            updateCachedData(draft => {
              const draftRoom =
                draft.find(({ id }) => id === message.roomId) ?? {}

              if (draftRoom) {
                Object.assign(draftRoom, {
                  message
                })
              }
            })
          }

          socket.on('createMessage', createMessageListener)
          socket.on('createRoom', createListener)
          socket.on('updateRoom', updateRoomListener)
        } catch (error) {
          console.error(error)
        }
      }
    }),
    createRoom: build.mutation<IRoom, IRoomForm>({
      query: body => ({
        url: 'rooms',
        method: 'POST',
        body
      })
    }),
    updateRoom: build.mutation<IRoom, IRoomForm>({
      query: body => ({
        url: `rooms`,
        method: 'PUT',
        body
      })
    }),
    getRoomMessages: build.query<IMessage[], string>({
      query: id => `rooms/${id}/messages`,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded }) {
        if (!socket) return

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
  useUpdateRoomMutation,
  useCreateRoomMutation,
  useCreateMessageMutation,
  useGetRoomMessagesQuery
} = chatApi
