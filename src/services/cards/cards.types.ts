export type CardsResponse = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type OptimisticCard = Pick<
  CardsResponse,
  'answer' | 'answerImg' | 'question' | 'questionImg'
>

export type UpdateCardsArgs = {
  body: FormData
  id: string
}

export type CreateCard = FormData
