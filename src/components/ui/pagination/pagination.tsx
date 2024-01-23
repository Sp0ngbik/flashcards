import { ArrowBackward, Dots } from '@/assets'
import { Select } from '@/components/ui/select'
import { SelectTextItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './pagination.module.scss'

import { DOTS, usePagination } from './hooks/usePagination'

type Props = {
  changeCurrentPage: (value: number) => void
  changeItemsPerPage: (value: number) => void
  className?: string
  currentPage: number
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export const Pagination = (props: Props) => {
  const {
    changeCurrentPage,
    changeItemsPerPage,
    className,
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  } = props
  const onChangeValue = (value: string) => {
    changeItemsPerPage(Number(value))
  }
  const paginationRange = usePagination({ currentPage, pageSize, siblingCount, totalCount })

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null
  }
  const onNext = () => {
    changeCurrentPage(currentPage + 1)
  }

  const onPrevious = () => {
    changeCurrentPage(currentPage - 1)
  }

  const lastPage = paginationRange?.[paginationRange.length - 1]
  const firstPage = 1

  if (lastPage && currentPage > Number(lastPage)) {
    changeCurrentPage(Number(lastPage))
  }

  const classNames = {
    arrowBackward: clsx(s.arrow, currentPage === firstPage && s.disabled),
    arrowForward: clsx(s.arrow, s.rotateArrow, currentPage === lastPage && s.disabled),
    paginationContainer: clsx(s.pagination_container, className),
  }

  return (
    <div className={classNames.paginationContainer}>
      <ArrowBackward className={classNames.arrowBackward} onClick={onPrevious} />

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <Dots className={s.dots} key={index} />
        }

        return (
          <li
            className={clsx(s.pagination_item, pageNumber === currentPage && s.selected)}
            key={index}
            onClick={() => changeCurrentPage(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        )
      })}
      <ArrowBackward className={classNames.arrowForward} onClick={onNext} />
      <Typography className={s.selectWrapper} variant={'body2'}>
        Показать
        <Select
          defaultValue={pageSize.toString()}
          onValueChange={onChangeValue}
          variant={'pagination'}
        >
          <SelectTextItem value={'4'}>4</SelectTextItem>
          <SelectTextItem value={'6'}>6</SelectTextItem>
          <SelectTextItem value={'8'}>8</SelectTextItem>
          <SelectTextItem value={'10'}>10</SelectTextItem>
          <SelectTextItem value={'12'}>12</SelectTextItem>
        </Select>
        на странице
      </Typography>
    </div>
  )
}
