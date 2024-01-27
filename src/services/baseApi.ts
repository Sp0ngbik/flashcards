import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
  }),
  endpoints() {
    return {}
  },
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards'],
})
