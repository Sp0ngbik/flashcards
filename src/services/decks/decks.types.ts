import { PaginationResponse } from '@/services/commom.types'

export type DeckResponse = PaginationResponse<Deck[]>

export type Deck = {
  author: DeckAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type DeckAuthor = {
  id: string
  name: string
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

export type CreateDeckArgs = FormData

export type DeleteDeckArgs = {
  id: string
}
export type MinMax = {
  max: number
  min: number
}
export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  id?: string
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}
export type GetCardsResponse = {
  items: RootObjectItems[]
  pagination: RootObjectPagination
}
export type RootObjectPagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
export type RootObjectItems = {
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
export type GetCardByIdResponse = {
  author: {
    id: string
    name: string
  }
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
