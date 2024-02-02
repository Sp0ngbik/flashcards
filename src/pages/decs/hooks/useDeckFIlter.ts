import { useDebounce } from '@/common/hooks/useDebounce'
import { usePageFilter } from '@/pages/hooks/pageFilter'
import { useGetMinMaxCardsQuery } from '@/services/cards/cards.service'
import { useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'

export const useDeckFilter = () => {
  const {
    changeSearchHandler,
    debounceCurrentPage,
    debounceName,
    me,
    onChangeCurrentPage,
    onChangeName,
    orderBy,
    search,
    searchBy,
    setItemsPerPage,
    setSortedBy,
    sortedString,
  } = usePageFilter()
  const { data: minMaxValues } = useGetMinMaxCardsQuery()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  const onTabValueChange = (value: string) => {
    changeSearchHandler('currentTab', value)
  }

  const getCurrentTab = search.get('currentTab') || 'allCards'

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const currentPage = Number(search.get('currentPage') || 1)

  const onChangeSliderValues = (value: number[]) => {
    changeSearchHandler('minCardsCount', value[0].toString())
    changeSearchHandler('maxCardsCount', value[1].toString())
  }
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  const debounceMinCards = useDebounce(minCards, 1000)
  const debounceMaxCards = useDebounce(maxCards, 1000)

  const clearFilter = () => {
    changeSearchHandler('orderBy', '')
    changeSearchHandler('name', '')
    changeSearchHandler('minCardsCount', '')
    changeSearchHandler('maxCardsCount', '')
    changeSearchHandler('itemsPerPage', '')
    changeSearchHandler('currentTab', '')
  }
  const { data: deckData, isLoading: deckIsLoading } = useGetDecksQuery({
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
    debounceName,
    deckData,
    deckIsLoading,
    deleteDeck,
    getCurrentTab,
    isDeckBeingDeleted,
    itemsPerPage,
    maxCards,
    me,
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
