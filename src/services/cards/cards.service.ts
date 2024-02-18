import { baseApi } from '@/services/baseApi'
import { CardBody, CardsResponse, OptimisticCard } from '@/services/cards/cards.types'
import { GetCardsArgs, GetCardsResponse, MinMax } from '@/services/decks/decks.types'
const cardFormDataHandler = (data: CardBody) => {
  const formData = new FormData()

  formData.append('question', data.question)
  formData.append('answer', data.answer)

  if (data.answerImg instanceof File) {
    formData.append('answerImg', data.answerImg)
  } else if (data.answerImg === null) {
    formData.append('answerImg', '')
  }
  if (data.questionImg instanceof File) {
    formData.append('questionImg', data.questionImg)
  } else if (data.questionImg === null) {
    formData.append('questionImg', '')
  }

  return formData
}

export const cardsService = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      createCard: build.mutation<CardsResponse, { data: CardBody; id: string }>({
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
          body: cardFormDataHandler(args.data),
          method: 'POST',
          url: `v1/decks/${args.id}/cards`,
        }),
      }),
      deleteCard: build.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          const queryArgs = cardsService.util.selectCachedArgsForQuery(getState(), 'getCards')

          const deleteResult = dispatch(
            cardsService.util.updateQueryData('getCards', queryArgs[0], draft => {
              const index = draft?.items?.findIndex(deck => deck.id === args.id)

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
      updateCard: build.mutation<CardsResponse, { data: CardBody; id: string }>({
        invalidatesTags: ['Cards'],
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          const queryArgs = cardsService.util.selectCachedArgsForQuery(getState(), 'getCards')

          const updateCardResult = dispatch(
            cardsService.util.updateQueryData('getCards', queryArgs[0], draft => {
              const index = draft.items.findIndex(el => el.id === args.id)
              const { answer, answerImg, question, questionImg } = args.data
              const updatedCard: Partial<OptimisticCard> = {}

              updatedCard.question = question
              updatedCard.answer = answer

              if (questionImg instanceof File) {
                updatedCard.questionImg = URL.createObjectURL(questionImg)
              }
              if (answerImg instanceof File) {
                updatedCard.answerImg = URL.createObjectURL(answerImg)
              }

              draft.items[index] = { ...draft.items[index], ...updatedCard }
            })
          )

          try {
            await queryFulfilled
          } catch {
            updateCardResult.undo()
          }
        },
        query: args => ({
          body: cardFormDataHandler(args.data),
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
