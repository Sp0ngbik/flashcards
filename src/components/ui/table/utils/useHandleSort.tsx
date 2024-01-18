import { useState } from 'react'

import { Sort } from '@/components/ui/table/table.stories'

export const useHandleSort = (options: Option[]) => {
  const [sort, setSort] = useState<Sort>(null)

  const sortedData = [...options]

  if (!sort?.key) {
    return sortedData
  }

  sortedData.sort((a, b) => {
    const valueA = a[sort?.key]
    const valueB = b[sort?.key]

    if (sort?.direction === 'asc') {
      if (valueA === undefined || valueB === undefined) {
        return 0
      }

      return typeof valueB === 'string'
        ? String(valueA).localeCompare(valueB)
        : Number(valueA) - valueB
    }

    if (valueA === undefined || valueB === undefined) {
      return 0
    }

    return typeof valueA === 'string'
      ? String(valueB).localeCompare(valueA)
      : Number(valueB) - valueA
  })

  return { setSort, sort, sortedData }
}

type Option = {
  [key: string]: number | string | undefined
  cardsCount: number
  createdBy: string
  image?: string
  title: string
  updated: string
}
