import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env?.REACT_APP_API_URL ?? ''}/v2`,
    prepareHeaders: headers => {
      const apiKey = process.env?.REACT_APP_API_KEY ?? ''

      if (apiKey) {
        headers.set('Authorization', `Bearer ${apiKey}`)
      }
    }
  }),

  endpoints: build => ({
    // getQuotes: build.query<IQuotesResponse, void>({
    //   query: () => 'quote'
    // }),
    // getCharacters: build.query<ICharacterResponse, void>({
    //   query: () => 'character'
    // }),
    // getCharacterQuote: build.query<IQuotesResponse, string>({
    //   query: id => `character/${id}/quote`
    // })
  })
})

export const { util, reducer, endpoints, middleware, reducerPath } = api
