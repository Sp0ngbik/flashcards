import { baseApi } from '@/services/baseApi'
import { CardsResponse, CreateCard, UpdateCardsArgs } from '@/services/cards/cards.types'
import { GetCardsArgs, GetCardsResponse, MinMax } from '@/services/decks/decks.types'

export const cardsService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      createCard: build.mutation<CardsResponse, { data: CreateCard; id: string }>({
        invalidatesTags: ['Cards', 'Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const res = await queryFulfilled
          const args = cardsService.util.selectCachedArgsForQuery(getState(), 'getCards')

          dispatch(
            cardsService.util.updateQueryData('getCards', args[0], draft => {
              draft.items.pop()
              draft.items.unshift(res.data)
            })
          )
        },
        query: args => ({
          body: args.data,
          method: 'POST',
          url: `v1/decks/${args.id}/cards`,
        }),
      }),
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
        providesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          params: args ?? undefined,
          url: `v1/decks/${id}/cards`,
        }),
      }),
      getMinMaxCards: build.query<MinMax, void>({
        providesTags: ['Cards'],
        query: () => 'v2/decks/min-max-cards',
      }),
      learnCard: build.query<CardsResponse, { id?: string }>({
        providesTags: ['Cards'],
        query: ({ id }) => `v1/decks/${id}/learn`,
      }),
      postCard: build.mutation<CardsResponse, { cardId: string; grade: number }>({
        invalidatesTags: ['Cards'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${args.cardId}/learn`,
        }),
      }),
      updateCard: build.mutation<CardsResponse, UpdateCardsArgs>({
        invalidatesTags: ['Cards'],
        query: args => ({
          body: args.body ?? undefined,
          method: 'PATCH',
          url: `v1/cards/${args.id}`,
        }),
      }),
    }
  },
})
export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
  useGetMinMaxCardsQuery,
  useLearnCardQuery,
  usePostCardMutation,
  useUpdateCardMutation,
} = cardsService
