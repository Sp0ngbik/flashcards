import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { Sort } from '@/common/ui/table/table.stories'
import { useMeQuery } from '@/services/auth/auth.sevice'
import { useDeleteDeckMutation, useGetMinMaxCardsQuery } from '@/services/decks/decks.service.'

export const useDeckFilter = () => {
  const [search, setSearch] = useSearchParams()

  const { data: me, isLoading: meIsLoading } = useMeQuery(undefined)
  const { data: minMaxValues } = useGetMinMaxCardsQuery(undefined)
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  // const setDefaultSearchParams = (defaultValue: string) => {
  //   if (!search.get(defaultValue)) {
  //     search.set(defaultValue, JSON.stringify(''))
  //     setSearch(search)
  //   }
  // }
  //
  // setDefaultSearchParams('orderBy')
  // setDefaultSearchParams('name')
  // setDefaultSearchParams('minCardsCount')
  // setDefaultSearchParams('currentPage')
  // setDefaultSearchParams('itemsPerPage')
  // setDefaultSearchParams('currentTab')

  const changeSearchHandler = (params: string) => {
    if (!params) {
      search.delete('search')
    } else {
      search.set('search', params)
      // params
    }
    search.set('page', '1')
    setSearch(params)
  }

  const onTabValueChange = (value: string) => {
    search.set('currentTab', value)
    setSearch(search)
    // changeSearchHandler(search)
  }

  const getCurrentTab = search.get('currentTab') || 'allCards'

  const setItemsPerPage = (value: number) => {
    search.set('itemsPerPage', value.toString())
    setSearch(search)
  }

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const onChangeCurrentPage = (value: number) => {
    search.set('currentPage', value.toString())
    setSearch(search)
  }
  const currentPage = Number(search.get('currentPage') || 1)

  const debounceCurrentPage = useDebounce(currentPage, 1000)

  const onChangeSliderValues = (value: number[]) => {
    search.set('minCardsCount', value[0].toString())
    search.set('maxCardsCount', value[1].toString())
    setSearch(search)
  }
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  const debounceMinCards = useDebounce(minCards, 1000)
  const debounceMaxCards = useDebounce(maxCards, 1000)

  const orderBy = JSON.parse(search.get('orderBy') || '""')
  const searchBy = JSON.parse(search.get('name') || '""')
  const debounceName = useDebounce(searchBy, 2000)

  const setSortedBy = (value: Sort) => {
    search.set('orderBy', JSON.stringify(value))
    setSearch(search)
  }

  const onChangeName = (value: string) => {
    search.set('name', JSON.stringify(value))
    setSearch(search)
  }

  return {
    currentPage,
    debounceCurrentPage,
    debounceMaxCards,
    debounceMinCards,
    debounceName,
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
