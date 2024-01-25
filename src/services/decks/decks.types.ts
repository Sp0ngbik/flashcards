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
// {
//   cover?: File | null
//   isPrivate?: boolean
//   name: string
// }
export type DeleteDeckArgs = {
  id: string
}
export type MinMax = {
  max: number
  min: number
}
