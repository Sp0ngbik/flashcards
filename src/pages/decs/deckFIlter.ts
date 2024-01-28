import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { Sort } from '@/common/ui/table/table.stories'
import { useMeQuery } from '@/services/auth/auth.sevice'
import {
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} from '@/services/decks/decks.service.'

export const useDeckFilter = () => {
  const [search, setSearch] = useSearchParams()

  const { data: me, isLoading: meIsLoading } = useMeQuery()
  const { data: minMaxValues } = useGetMinMaxCardsQuery()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search)
  }

  const onTabValueChange = (value: string) => {
    changeSearchHandler('currentTab', value)
  }

  const getCurrentTab = search.get('currentTab') || 'allCards'

  const setItemsPerPage = (value: number) => {
    changeSearchHandler('itemsPerPage', value.toString())
  }

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const onChangeCurrentPage = (value: number) => {
    changeSearchHandler('currentPage', value.toString())
  }
  const currentPage = Number(search.get('currentPage') || 1)

  const debounceCurrentPage = useDebounce(currentPage, 1000)

  const onChangeSliderValues = (value: number[]) => {
    changeSearchHandler('minCardsCount', value[0].toString())
    changeSearchHandler('maxCardsCount', value[1].toString())
  }
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  const debounceMinCards = useDebounce(minCards, 1000)
  const debounceMaxCards = useDebounce(maxCards, 1000)

  const orderBy = JSON.parse(search.get('orderBy') || '""')
  const searchBy = search.get('name') || ''
  const debounceName = useDebounce(searchBy, 2000)
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

  const onChangeName = (value: string) => {
    changeSearchHandler('name', value)
  }

  const clearFilter = () => {
    changeSearchHandler('orderBy', '')
    changeSearchHandler('name', '')
    changeSearchHandler('minCardsCount', '')
    changeSearchHandler('maxCardsCount', '')
    changeSearchHandler('itemsPerPage', '')
    changeSearchHandler('currentTab', '')
  }
  const {
    data,
    error: deckError,
    isLoading: deckIsLoading,
  } = useGetDecksQuery({
    authorId: getCurrentTab === 'userCards' ? me?.id : undefined,
    currentPage: debounceCurrentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: debounceMaxCards,
    minCardsCount: debounceMinCards,
    name: debounceName,
    orderBy: sortedString,
  })

  return {
    clearFilter,
    currentPage,
    data,

    debounceName,
    deckError,
    deckIsLoading,
    deleteDeck,
    getCurrentTab,
    isDeckBeingDeleted,
    itemsPerPage,
    maxCards,
    me,
    meIsLoading,
    minCards,
    minMaxValues,
    onChangeCurrentPage,
    onChangeName,
    onChangeSliderValues,
    onTabValueChange,
    orderBy,
    searchBy,
    setItemsPerPage,
    setSortedBy,
  }
}
