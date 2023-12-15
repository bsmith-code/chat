import { AnyAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import io, { Socket } from 'socket.io-client'

import { showNotification } from 'utils'

import { IRootState, TAppListenerAPI } from 'types/redux'
import { IMessage, IMessageCreate, IRoom, IRoomForm, IUser } from 'types/room'

const baseUrl = process.env.REACT_APP_API_BASE_URL ?? ''
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
    }),
    error: build.mutation<
      void,
      { host: string; name: string; message: string; stack?: string }
    >({
      query: body => ({
        url: 'error',
        method: 'POST',
        body
      })
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST'
      })
    })
  })
})

export const {
  useSessionQuery,
  useGetUsersQuery,
  useLogoutMutation,
  useErrorMutation
} = authApi

export const selectUser = (state: IRootState) =>
  authApi.endpoints.session.select()(state).data ?? ({} as IUser)

export const authListeners = [
  {
    matcher: authApi.endpoints.logout.matchFulfilled,
    effect: (_: AnyAction, { dispatch }: TAppListenerAPI) => {
      dispatch(authApi.util.resetApiState())
    }
  }
]

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

            updateCachedData(draft => [room, ...draft])
          }

          const updateRoomListener = (room: IRoom) => {
            updateCachedData(draft => {
              const isMember = room.members.find(({ id }) => id === arg)
              if (!isMember) {
                const roomIndex = draft.findIndex(({ id }) => id === room.id)
                return [
                  ...draft.slice(0, roomIndex),
                  ...draft.slice(roomIndex + 1)
                ]
              }

              const draftRoom = draft.find(({ id }) => id === room.id)
              if (draftRoom) {
                Object.assign(draftRoom, room)
                return draft
              }

              return [room, ...draft]
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
    getRoomMessages: build.query<
      IMessage[],
      { roomId: string; userId: string }
    >({
      query: ({ roomId }) => `rooms/${roomId}/messages`,
      async onCacheEntryAdded(
        { roomId, userId },
        { updateCachedData, cacheDataLoaded }
      ) {
        if (!socket) return

        try {
          await cacheDataLoaded

          const listener = async (message: IMessage) => {
            if (message.roomId !== roomId) return

            updateCachedData(draft => {
              draft.push(message)
            })

            if (message.userId !== userId) {
              await showNotification(message)
            }
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
