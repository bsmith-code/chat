import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IRoom } from 'types/room'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env?.REACT_APP_API_BASE_URL ?? ''}/v1/chat`,
    credentials: 'include'
  }),
  endpoints: build => ({
    getRooms: build.query<IRoom[], void>({
      query: () => 'rooms'
    })
    // getCharacters: build.query<ICharacterResponse, void>({
    //   query: () => 'character'
    // }),
    // getCharacterQuote: build.query<IQuotesResponse, string>({
    //   query: id => `character/${id}/quote`
    // })
  })
})

export const {
  util,
  reducer,
  endpoints,
  middleware,
  reducerPath,
  useGetRoomsQuery
} = api
