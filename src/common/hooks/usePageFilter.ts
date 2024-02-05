import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { Sort } from '@/common/ui/table/table.stories'
import { useMeQuery } from '@/services/auth/auth.service'

export const usePageFilter = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()

  const { data: me } = useMeQuery()

  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search)
  }

  const setItemsPerPage = (value: number) => {
    changeSearchHandler('itemsPerPage', value.toString())
  }

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const onChangeCurrentPage = (value: number) => {
    changeSearchHandler('currentPage', value.toString())
  }
  const currentPage = Number(search.get('currentPage') || 1)

  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

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

  return {
    changeSearchHandler,
    currentPage,
    debounceName,
    itemsPerPage,
    maxCards,
    me,
    minCards,
    navigate,
    onChangeCurrentPage,
    onChangeName,
    orderBy,
    search,
    searchBy,
    setItemsPerPage,
    setSortedBy,
    sortedString,
  }
}
