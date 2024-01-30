import { baseApi } from '@/services/baseApi'
import { CardsResponse, UpdateCardsArgs } from '@/services/cards/cards.types'
import { GetCardsArgs, GetCardsResponse, MinMax } from '@/services/decks/decks.types'

export const cardsService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      deleteCard: build.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: args => ({
          method: 'DELETE',
          url: `v1/cards/${args.id}`,
        }),
      }),
      getCardById: build.query<CardsResponse, { id?: string }>({
        providesTags: ['Cards'],
        query: args => ({
          url: `v1/cards/${args.id}`,
        }),
      }),
      getCards: build.query<GetCardsResponse, GetCardsArgs>({
        providesTags: ['Decks'],
        query: ({ id, ...args }) => ({
          params: args ?? undefined,
          url: `v1/decks/${id}/cards`,
        }),
      }),
      getMinMaxCards: build.query<MinMax, void>({
        providesTags: ['Decks'],
        query: () => 'v2/decks/min-max-cards',
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
export const {
  useDeleteCardMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
  useGetMinMaxCardsQuery,
  useUpdateCardMutation,
} = cardsService
