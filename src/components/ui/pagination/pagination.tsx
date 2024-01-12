import { useState } from 'react'

import { ArrowBackward } from '@/assets/icons/arrow-back'
import { ArrowForward } from '@/assets/icons/arrow-forward'
import { Dots } from '@/assets/icons/dots'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

type Props = {
  pageSize: number
  siblings: number
  totalElements: number
}

const Pagination = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(6)
  const { pageSize, totalElements } = props
  const totalCount = Math.ceil(totalElements / pageSize)
  const startIndex = 1
  const endIndex = totalCount

  const onBackward = () => {
    setCurrentPage(currentPage - 1)
  }

  const onForward = () => {
    setCurrentPage(currentPage + 1)
  }
  const rangeHandler = (el: number) => {
    if (el <= 5) {
      return (
        <>
          <ArrowBackward className={s.arrow} onClick={onBackward} />
          <button
            onClick={() => {
              setCurrentPage(startIndex)
            }}
          >
            {startIndex}
          </button>
          <button
            onClick={() => {
              setCurrentPage(2)
            }}
          >
            {2}
          </button>
          <button
            onClick={() => {
              setCurrentPage(3)
            }}
          >
            {3}
          </button>
          <button
            onClick={() => {
              setCurrentPage(4)
            }}
          >
            {4}
          </button>
          <button
            onClick={() => {
              setCurrentPage(5)
            }}
          >
            {5}
          </button>
          <Dots className={s.dots} />
          <button
            onClick={() => {
              setCurrentPage(endIndex)
            }}
          >
            {endIndex}
          </button>
          <ArrowForward className={s.arrow} onClick={onForward} />
        </>
      )
    } else if (el + 5 >= endIndex) {
      return (
        <>
          <ArrowBackward className={s.arrow} onClick={onBackward} />
          <button
            onClick={() => {
              setCurrentPage(startIndex)
            }}
          >
            {startIndex}
          </button>
          <Dots className={s.dots} />
          <button
            onClick={() => {
              setCurrentPage(endIndex - 4)
            }}
          >
            {endIndex - 4}
          </button>
          <button
            onClick={() => {
              setCurrentPage(endIndex - 3)
            }}
          >
            {endIndex - 3}
          </button>
          <button
            onClick={() => {
              setCurrentPage(endIndex - 2)
            }}
          >
            {endIndex - 2}
          </button>
          <button
            onClick={() => {
              setCurrentPage(endIndex - 1)
            }}
          >
            {endIndex - 1}
          </button>
          <button>{endIndex}</button>
          <ArrowForward className={s.arrow} onClick={onForward} />
        </>
      )
    } else {
      return (
        <>
          <ArrowBackward className={s.arrow} onClick={onBackward} />
          <button
            onClick={() => {
              setCurrentPage(startIndex)
            }}
          >
            {startIndex}
          </button>
          <Dots className={s.dots} />
          <button
            onClick={() => {
              setCurrentPage(el - 1)
            }}
          >
            {el - 1}
          </button>
          <button
            onClick={() => {
              setCurrentPage(el)
            }}
          >
            {el}
          </button>
          <button
            onClick={() => {
              setCurrentPage(el + 1)
            }}
          >
            {el + 1}
          </button>
          <Dots className={s.dots} />
          <button
            onClick={() => {
              setCurrentPage(endIndex)
            }}
          >
            {endIndex}
          </button>
          <ArrowForward className={s.arrow} onClick={onForward} />
        </>
      )
    }
  }

  return (
    <div className={s.paginationWrapper}>
      <>{rangeHandler(currentPage)}</>
      <Typography className={s.selectWrapper} variant={'body2'}>
        Показать
        <Select
          className={s.paginationSelect}
          classNameItem={s.paginationSelectItem}
          options={['10', '20', '30', '100']}
        />
        на странице
      </Typography>
    </div>
  )
}

export default Pagination
