import { baseApi } from '@/services/baseApi'
import {
  CreateDeckArgs,
  Deck,
  DeckResponse,
  DeleteDeckArgs,
  GetCardByIdResponse,
  GetDecksArgs,
  UpdateDeck,
} from '@/services/decks/decks.types'

export const decksService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      createDeck: build.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const res = await queryFulfilled

          const args = decksService.util.selectCachedArgsForQuery(getState(), 'getDecks')

          dispatch(
            decksService.util.updateQueryData('getDecks', args[0], draft => {
              draft.items.pop()
              draft.items.unshift(res.data)
            })
          )
        },
        query: args => ({
          body: args ?? undefined,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: build.mutation<Deck, DeleteDeckArgs>({
        // invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const args = decksService.util.selectCachedArgsForQuery(getState(), 'getDecks')

          // for (const { endpointName } of decksService.util.selectInvalidatedBy(getState(), [
          //   { type: 'Decks' },
          // ])) {
          //   if (endpointName !== 'getDecks') {
          //     continue
          //   }
          const deleteResult = dispatch(
            decksService.util.updateQueryData('getDecks', args[0], draft => {
              const index = draft?.items?.findIndex(deck => deck.id === id)

              if (index !== undefined && index !== -1) {
                draft?.items?.splice(index, 1)
              }
            })
          )

          // }
          try {
            await queryFulfilled
          } catch {
            deleteResult.undo()
          }
        },
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),

      getDeckById: build.query<GetCardByIdResponse, { id?: string }>({
        providesTags: ['Cards'],
        query: args => ({
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDecks: build.query<DeckResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: 'v2/decks',
        }),
      }),
      updateDeck: build.mutation<GetCardByIdResponse, { data: UpdateDeck; id: string }>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args.data,
          method: 'PATCH',
          url: `v1/decks/${args.id}`,
        }),
      }),

      userDecks: build.query<Deck, { id: string }>({
        query: args => ({
          params: args,
          url: `/v1/decks/${args.id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
  useUserDecksQuery,
} = decksService
