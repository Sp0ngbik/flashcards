import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { Sort } from '@/common/ui/table/table.stories'
import { useMeQuery } from '@/services/auth/auth.sevice'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useDeleteDeckMutation, useGetDeckByIdQuery } from '@/services/decks/decks.service.'

export const useCardFilter = (id: string | undefined) => {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const { data: me } = useMeQuery()
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const backDeck = sessionStorage.getItem('lastLocation')
  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search)
  }
  const onChangeCurrentPage = (value: number) => {
    changeSearchHandler('currentPage', value.toString())
  }
  const setItemsPerPage = (value: number) => {
    changeSearchHandler('itemsPerPage', value.toString())
  }
  const orderBy = JSON.parse(search.get('orderBy') || '""')
  const sortedString = useMemo(() => {
    if (!orderBy) {
      return null
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])
  const setSortedBy = (value: Sort) => {
    if (!value || value?.key) {
      changeSearchHandler('orderBy', JSON.stringify(value))
    }
  }
  const searchBy = search.get('name') || ''
  const debounceName = useDebounce(searchBy, 2000)
  const onChangeName = (value: string) => {
    changeSearchHandler('name', value)
  }
  const currentPage = Number(search.get('currentPage') || 1)
  const itemsPerPage = Number(search.get('itemsPerPage') || '4')
  const { data: getCardsData } = useGetCardsQuery({
    currentPage,
    id,
    itemsPerPage,
    orderBy: sortedString,
    question: debounceName,
  })
  const { data: getCardByIdData } = useGetDeckByIdQuery({ id })

  const onAddNewCardHandler = () => {
    setIsOpen(true)
  }
  const isOwner = me?.id === getCardByIdData?.userId
  const isEmpty = getCardByIdData?.cardsCount === 0
  const [deleteDeck] = useDeleteDeckMutation()
  const deleteDeckHandler = async () => {
    if (id) {
      await deleteDeck(id).unwrap()
      navigate(`${backDeck}`)
    }
  }

  const onEditClickHandler = () => {
    setIsOpenEdit(true)
  }

  return {
    backDeck,
    currentPage,
    deleteDeckHandler,
    getCardByIdData,
    getCardsData,
    isEmpty,
    isOpen,
    isOpenEdit,
    isOwner,
    itemsPerPage,
    navigate,
    onAddNewCardHandler,
    onChangeCurrentPage,
    onChangeName,
    onEditClickHandler,
    orderBy,
    searchBy,
    setIsOpen,
    setIsOpenEdit,
    setItemsPerPage,
    setSortedBy,
  }
}
