import { baseQueryWithReauth } from '@/services/base-api-with-reauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints() {
    return {}
  },

  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Me'],
})
