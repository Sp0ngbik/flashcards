import { useState } from 'react'

import { ArrowBackward } from '@/assets/icons/arrow-back'
import { ArrowForward } from '@/assets/icons/arrow-forward'
import { Dots } from '@/assets/icons/dots'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

import { DOTS, usePagination } from './hooks/usePagination'
type Props = {
  className?: string
  pageSize: number
  selectOptions: string[]
  siblingCount?: number
  totalCount: number
}

const Pagination = (props: Props) => {
  const { className, pageSize, selectOptions, siblingCount, totalCount } = props
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
      <ArrowForward
        className={`${s.arrow} ${currentPage === lastPage && s.disabled}`}
        onClick={onNext}
      />
      <Typography as={'div'} className={s.selectWrapper} variant={'body2'}>
        Показать
        <Select
          className={s.paginationSelect}
          classNameItem={s.paginationSelectItem}
          options={selectOptions}
        />
        на странице
      </Typography>
    </ul>
  )
}

export default Pagination
