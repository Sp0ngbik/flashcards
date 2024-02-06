import { useState } from 'react'

import { usePageFilter } from '@/common/hooks/usePageFilter'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

export const useCardFilter = (id: string | undefined) => {
  const {
    currentPage,
    debounceName,
    itemsPerPage,
    me,
    onChangeCurrentPage,
    onChangeName,
    orderBy,
    searchBy,
    setItemsPerPage,
    setSortedBy,
    sortedString,
  } = usePageFilter()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const { data: getCardsData } = useGetCardsQuery({
    currentPage,
    id,
    itemsPerPage,
    orderBy: sortedString,
    question: debounceName,
  })
  const { data: getDeckById } = useGetDeckByIdQuery({ id })

  const isOwner = me?.id === getDeckById?.userId
  const isEmpty = getDeckById?.cardsCount === 0

  return {
    currentPage,
    getCardsData,
    getDeckById,
    isEmpty,
    isOpen,
    isOpenEdit,
    isOwner,
    itemsPerPage,
    onChangeCurrentPage,
    onChangeName,
    orderBy,
    searchBy,
    setIsOpen,
    setIsOpenEdit,
    setItemsPerPage,
    setSortedBy,
  }
}
