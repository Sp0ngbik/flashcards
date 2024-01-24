import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/components/hooks/useDebounce'
import { Sort } from '@/components/ui/table/table.stories'
import { useMeQuery } from '@/services/auth/auth.sevice'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetMinMaxCardsQuery,
} from '@/services/decks/decks.service.'

export const useDeckFilter = () => {
  const [search, setSearch] = useSearchParams({
    currentPage: '1',
    currentTab: 'allCards',
    itemsPerPage: '8',
    maxCardsCount: '15',
    minCardsCount: '0',
    name: '',
    orderBy: '',
  })
  const { data: me, isLoading: meIsLoading } = useMeQuery(undefined)
  const { data: minMaxValues } = useGetMinMaxCardsQuery(undefined)
  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()
  const setDefaultSearchParams = (defaultValue: string) => {
    if (!search.get(defaultValue)) {
      search.set(defaultValue, JSON.stringify(''))
      setSearch(search)
    }
  }

  setDefaultSearchParams('orderBy')
  setDefaultSearchParams('name')
  setDefaultSearchParams('minCardsCount')
  setDefaultSearchParams('currentPage')
  setDefaultSearchParams('itemsPerPage')
  setDefaultSearchParams('currentTab')

  const onTabValueChange = (value: string) => {
    search.set('currentTab', value)
    setSearch(search)
  }

  const getCurrentTab = search.get('currentTab')

  const setItemsPerPage = (value: number) => {
    search.set('itemsPerPage', value.toString())
    setSearch(search)
  }

  const itemsPerPage = Number(search.get('itemsPerPage'))

  const onChangeCurrentPage = (value: number) => {
    search.set('currentPage', value.toString())
    setSearch(search)
  }
  const currentPage = Number(JSON.parse(search.get('currentPage') as string))
  const debounceCurrentPage = useDebounce(currentPage, 1000)

  const onChangeSliderValues = (value: number[]) => {
    search.set('minCardsCount', value[0].toString())
    search.set('maxCardsCount', value[1].toString())
    setSearch(search)
  }
  const minCards = Number(search.get('minCardsCount'))
  const maxCards = Number(search.get('maxCardsCount'))

  const debounceMinCards = useDebounce(minCards, 1000)
  const debounceMaxCards = useDebounce(maxCards, 1000)

  const orderBy = JSON.parse(search.get('orderBy') as string)
  const searchBy = JSON.parse(search.get('name') as string)
  const debounceName = useDebounce(searchBy, 2000)

  const setSortedBy = (value: Sort) => {
    search.set('orderBy', JSON.stringify(value))
    setSearch(search)
  }

  const onChangeName = (value: string) => {
    search.set('name', value)
    setSearch(search)
  }

  const onCreateDeck = () => {
    createDeck({ name: 'deck check' })
  }

  return {
    currentPage,
    debounceCurrentPage,
    debounceMaxCards,
    debounceMinCards,
    debounceName,
    deleteDeck,
    getCurrentTab,
    isDeckBeingCreated,
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
    onCreateDeck,
    onTabValueChange,
    orderBy,
    searchBy,
    setItemsPerPage,
    setSortedBy,
  }
}
