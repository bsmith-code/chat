import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import io from 'socket.io-client'

import { IRootState } from 'types/redux'
import { IMessage, IMessageCreate, IRoom, IUser } from 'types/room'

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

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/v1/chat`,
    credentials: 'include'
  }),
  tagTypes: ['IRoom'],
  endpoints: build => ({
    getRooms: build.query<IRoom[], void>({
      query: () => 'rooms',
      providesTags: ['IRoom']
    }),
    createRoom: build.mutation<IRoom, { name: string; members: string[] }>({
      query: body => ({
        url: 'rooms',
        method: 'POST',
        body
      }),
      invalidatesTags: ['IRoom']
    }),
    getRoomMessages: build.query<IMessage[], string>({
      query: id => `rooms/${id}/messages`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const socket = io(baseUrl)

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (message: IMessage) => {
            if (message.roomId !== arg) return

            updateCachedData(draft => {
              draft.push(message)
            })
          }

          socket.on('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
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
export const { useSessionQuery, useGetUsersQuery } = authApi

export const selectUser = (state: IRootState) =>
  authApi.endpoints.session.select()(state).data ?? ({} as IUser)
