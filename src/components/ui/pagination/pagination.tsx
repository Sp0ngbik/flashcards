import { useState } from 'react'

import { ArrowBackward, Dots } from '@/assets'
import { Select } from '@/components/ui/select'
import { SelectItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

import { DOTS, usePagination } from './hooks/usePagination'

type Props = {
  className?: string
  siblingCount?: number
  totalCount: number
}

export const Pagination = (props: Props) => {
  const { className, siblingCount, totalCount } = props
  const [pageSize, setPageSize] = useState(10)
  const onChangeValue = (value: string) => {
    setPageSize(Number(value))
  }
  const [currentPage, setCurrentPage] = useState(1)
  const paginationRange = usePagination({ currentPage, pageSize, siblingCount, totalCount })

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null
  }
  const onNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const onPrevious = () => {
    setCurrentPage(currentPage - 1)
  }
  const lastPage = paginationRange?.[paginationRange.length - 1]
  const firstPage = 1

  return (
    <ul className={`${s.pagination_container} ${className}`}>
      <ArrowBackward
        className={`${s.arrow} ${currentPage === firstPage && s.disabled} `}
        onClick={onPrevious}
      />

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <Dots className={s.dots} key={index} />
        }

        return (
          <li
            className={`${s.pagination_item} ${pageNumber === currentPage && s.selected}`}
            key={index}
            onClick={() => setCurrentPage(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        )
      })}
      <ArrowBackward
        className={`${s.arrow} ${s.rotateArrow} ${currentPage === lastPage && s.disabled}`}
        onClick={onNext}
      />
      <Typography as={'div'} className={s.selectWrapper} variant={'body2'}>
        Показать
        <Select defaultValue={'10'} onValueChange={onChangeValue} variant={'pagination'}>
          <SelectItem value={'10'}>10</SelectItem>
          <SelectItem value={'20'}>20</SelectItem>
          <SelectItem value={'30'}>30</SelectItem>
          <SelectItem value={'50'}>50</SelectItem>
          <SelectItem value={'100'}>100</SelectItem>
        </Select>
        на странице
      </Typography>
    </ul>
  )
}
