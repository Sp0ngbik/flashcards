import { useDebounce } from '@/common/hooks/useDebounce'
import { usePageFilter } from '@/common/hooks/usePageFilter'
import { useGetMinMaxCardsQuery } from '@/services/cards/cards.service'
import { useGetDecksQuery } from '@/services/decks/decks.service'

export const useDeckFilter = () => {
  const {
    changeSearchHandler,
    currentPage,
    debounceName,
    me,
    onChangeCurrentPage,
    onChangeName,
    orderBy,
    search,
    searchBy,
    setItemsPerPage,
    setSearch,
    setSortedBy,
    sortedString,
  } = usePageFilter()
  const { data: minMaxValues } = useGetMinMaxCardsQuery()

  const onTabValueChange = (value: string) => {
    changeSearchHandler('currentTab', value)
  }

  const getCurrentTab = search.get('currentTab') || 'allCards'

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const onChangeSliderValues = (value: number[]) => {
    changeSearchHandler('minCardsCount', value[0].toString())
    changeSearchHandler('maxCardsCount', value[1].toString())
  }
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  const debounceMinCards = useDebounce(minCards, 1000)
  const debounceMaxCards = useDebounce(maxCards, 1000)

  const clearFilter = () => {
    setSearch({})
  }
  const { data: deckData, isLoading: deckIsLoading } = useGetDecksQuery({
    authorId: getCurrentTab === 'userCards' ? me?.id : undefined,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: debounceMaxCards,
    minCardsCount: debounceMinCards,
    name: debounceName,
    orderBy: sortedString,
  })

  return {
    clearFilter,
    currentPage,
    deckData,
    deckIsLoading,
    getCurrentTab,
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
