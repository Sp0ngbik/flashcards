import { baseApi } from '@/services/baseApi'
import {
  Deck,
  DeckBody,
  DeckResponse,
  GetCardsByIdResponse,
  GetDecksArgs,
  OptimisticDeck,
} from '@/services/decks/decks.types'

const deckFormDataHandler = (data: DeckBody) => {
  const formData = new FormData()

  if (data.cover instanceof File) {
    formData.append('cover', data.cover)
  } else if (data.cover === null) {
    formData.append('cover', '')
  }
  formData.append('name', data.name)
  formData.append('isPrivate', String(data.isPrivate))

  return formData
}

export const decksService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      createDeck: build.mutation<Deck, DeckBody>({
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
          body: deckFormDataHandler(args),
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: build.mutation<Deck, string>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
          const args = decksService.util.selectCachedArgsForQuery(getState(), 'getDecks')

          const deleteResult = dispatch(
            decksService.util.updateQueryData('getDecks', args[0], draft => {
              const index = draft?.items?.findIndex(deck => deck.id === id)

              if (index !== undefined && index !== -1) {
                draft?.items?.splice(index, 1)
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            deleteResult.undo()
          }
        },
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args}`,
        }),
      }),

      getDeckById: build.query<GetCardsByIdResponse, { id?: string }>({
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
      updateDeck: build.mutation<GetCardsByIdResponse, { data: DeckBody; id: string }>({
        invalidatesTags: ['Decks', 'Cards'],
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          const queryArgs = decksService.util.selectCachedArgsForQuery(getState(), 'getDecks')

          const updateResult = dispatch(
            decksService.util.updateQueryData('getDecks', queryArgs[0], draft => {
              const { cover, isPrivate, name } = args.data
              const index = draft?.items?.findIndex(deck => deck.id === args.id)

              const updated: Partial<OptimisticDeck> = {}

              updated.isPrivate = isPrivate
              updated.name = name
              if (cover instanceof File) {
                updated.cover = URL.createObjectURL(cover)
              }

              if (index !== undefined && index !== -1) {
                draft.items[index] = { ...draft.items[index], ...updated }
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            updateResult.undo()
          }
        },
        query: args => ({
          body: deckFormDataHandler(args.data),
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
