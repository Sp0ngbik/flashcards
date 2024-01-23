import { baseApi } from '@/services/baseApi'
import { CardsResponse, UpdateCardsArgs } from '@/services/cards/cards.types'

export const CardsService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      deleteCard: build.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: args => ({
          method: 'DELETE',
          url: `v1/cards/${args.id}`,
        }),
      }),
      getСards: build.query<CardsResponse, { id: string }>({
        providesTags: ['Cards'],
        query: args => ({
          params: args ?? undefined,
          url: `v1/cards/${args.id}`,
        }),
      }),
      updateCard: build.mutation<CardsResponse, UpdateCardsArgs>({
        invalidatesTags: ['Cards'],
        query: args => ({
          body: args ?? undefined,
          method: 'PATH',
          url: `v1/cards${args.id}`,
        }),
      }),
    }
  },
})
export const { useGetСardsQuery } = CardsService
