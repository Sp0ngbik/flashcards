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

export type CardBody = {
  answer: string
  answerImg: File | null | string
  question: string
  questionImg: File | null | string
}

export type OptimisticCard = Pick<
  CardsResponse,
  'answer' | 'answerImg' | 'question' | 'questionImg'
>
