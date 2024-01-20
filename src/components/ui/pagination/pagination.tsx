import { useState } from 'react'

import { ArrowBackward, Dots } from '@/assets'
import { Select } from '@/components/ui/select'
import { SelectTextItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

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

  const classNames = {
    arrowBackward: clsx(s.arrow, currentPage === firstPage && s.disabled),
    arrowForward: clsx(s.arrow, s.rotateArrow, currentPage === lastPage && s.disabled),
    paginationContainer: clsx(s.pagination_container, className),
  }

  return (
    <ul className={classNames.paginationContainer}>
      <ArrowBackward className={classNames.arrowBackward} onClick={onPrevious} />

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <Dots className={s.dots} key={index} />
        }

        return (
          <li
            className={clsx(s.pagination_item, pageNumber === currentPage && s.selected)}
            key={index}
            onClick={() => setCurrentPage(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        )
      })}
      <ArrowBackward className={classNames.arrowForward} onClick={onNext} />
      <Typography className={s.selectWrapper} variant={'body2'}>
        Показать
        <Select defaultValue={'10'} onValueChange={onChangeValue} variant={'pagination'}>
          <SelectTextItem value={'10'}>10</SelectTextItem>
          <SelectTextItem value={'20'}>20</SelectTextItem>
          <SelectTextItem value={'30'}>30</SelectTextItem>
          <SelectTextItem value={'50'}>50</SelectTextItem>
          <SelectTextItem value={'100'}>100</SelectTextItem>
        </Select>
        на странице
      </Typography>
    </ul>
  )
}
