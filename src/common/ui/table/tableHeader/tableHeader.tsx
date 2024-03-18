import { ComponentPropsWithoutRef, FC } from 'react'

import { ArrowDown } from '@/assets'
import { Column, Sort } from '@/common/ui/table/table.stories'
import { TableHead, TableHeadCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { Typography } from '@/common/ui/typography'
import { clsx } from 'clsx'

import s from '../tableConstuctor/table.module.scss'

export const TableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      className?: string
      columns: Column[]
      isOwner?: boolean
      onSort?: (sort: Sort) => void
      sort?: Sort
    },
    'children'
  >
> = ({ className, columns, isOwner = false, onSort, sort, ...rest }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }
  const classNames = {
    arrow: clsx(s.arrow, sort?.direction === 'asc' && s.arrowUp),
  }

  return (
    <TableHead {...rest}>
      <TableRow>
        {columns.map(
          ({ key, ownerValidate, sortable = true, title }) =>
            (isOwner || !ownerValidate) && (
              <TableHeadCell className={className} key={key} onClick={handleSort(key, sortable)}>
                <Typography className={s.tableHeadTitle} variant={'subtitle2'}>
                  {title} {sort && sort.key === key && <ArrowDown className={classNames.arrow} />}
                </Typography>
              </TableHeadCell>
            )
        )}
      </TableRow>
    </TableHead>
  )
}
