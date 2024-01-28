import { baseApi } from '@/services/baseApi'
import {
  CreateDeckArgs,
  Deck,
  DeckResponse,
  DeleteDeckArgs,
  GetCardByIdResponse,
  GetCardsArgs,
  GetCardsResponse,
  GetDecksArgs,
  MinMax,
} from '@/services/decks/decks.types'

export const DecksService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      createDeck: build.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args ?? undefined,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: build.mutation<Deck, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      getCards: build.query<GetCardsResponse, GetCardsArgs>({
        providesTags: ['Decks'],
        query: args => ({
          url: `v1/decks/${args.id}/cards`,
        }),
      }),
      getDeckById: build.query<GetCardByIdResponse, { id?: string }>({
        providesTags: ['Decks'],
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
      getMinMaxCards: build.query<MinMax, void>({
        providesTags: ['Decks'],
        query: () => 'v2/decks/min-max-cards',
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} = DecksService
