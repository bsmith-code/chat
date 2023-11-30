import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IRootState } from 'types/redux'
import { IRoom, IUser } from 'types/room'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env?.REACT_APP_API_BASE_URL ?? ''}/v1/auth`,
    credentials: 'include'
  }),
  endpoints: build => ({
    session: build.query<IUser, void>({
      query: () => 'session'
    })
  })
})

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env?.REACT_APP_API_BASE_URL ?? ''}/v1/chat`,
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
    })
    // getCharacters: build.query<ICharacterResponse, void>({
    //   query: () => 'character'
    // }),
    // getCharacterQuote: build.query<IQuotesResponse, string>({
    //   query: id => `character/${id}/quote`
    // })
  })
})

export const { useGetRoomsQuery, useCreateRoomMutation } = chatApi
export const { useSessionQuery } = authApi

export const selectUser = (state: IRootState) =>
  authApi.endpoints.session.select()(state).data
