import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { Sort } from '@/common/ui/table/table.stories'
import { useMeQuery } from '@/services/auth/auth.service'

export const usePageFilter = () => {
  const [search, setSearch] = useSearchParams({})

  const { data: me } = useMeQuery()

  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search, { replace: true })
  }

  const setItemsPerPage = (value: number) => {
    changeSearchHandler('itemsPerPage', value.toString())
  }

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const onChangeCurrentPage = (value: number) => {
    changeSearchHandler('currentPage', value.toString())
  }
  const currentPage = Number(search.get('currentPage') || 1)

  const orderBy = JSON.parse(search.get('orderBy') || '""')
  const searchBy = search.get('name') || ''
  const debounceName = useDebounce(searchBy, 700)
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
  }
}
