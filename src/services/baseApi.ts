import { baseQueryWithRauth } from '@/services/baseApiReauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithRauth,
  endpoints() {
    return {}
  },

  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Me'],
})
