import { useParams } from 'react-router-dom'

import { cardColumns } from '@/common/const'
import { Loader } from '@/common/ui/loader'
import { Pagination } from '@/common/ui/pagination'
import { Table, TableBody } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import { Typography } from '@/common/ui/typography'
import { useCardFilter } from '@/pages/cards/hooks/useCardFilter'
import { CardRow } from '@/pages/cards/ui/card/cardRow'
import CardHeader from '@/pages/cards/ui/cardHeader/cardHeader'

import s from './cards.module.scss'

export const Cards = () => {
  const { id } = useParams<{ id: string }>()
  const {
    currentPage,
    getCardsData,
    isCardLoaded,
    isEmpty,
    isOwner,
    itemsPerPage,
    onChangeCurrentPage,
    orderBy,
    setItemsPerPage,
    setSortedBy,
  } = useCardFilter(id)

  if (isCardLoaded) {
    return <Loader transparentBackground />
  }

  return (
    <div className={s.cardWrapper}>
      <CardHeader />
      {!isEmpty && (
        <>
          <Table>
            <TableHeader
              className={s.tryHard}
              columns={cardColumns}
              isOwner={isOwner}
              onSort={setSortedBy}
              sort={orderBy}
            />
            <TableBody>
              {getCardsData?.items?.map(card => {
                return <CardRow card={card} isOwner={isOwner} key={card.id} />
              })}
            </TableBody>
          </Table>
          <Pagination
            changeCurrentPage={onChangeCurrentPage}
            changeItemsPerPage={setItemsPerPage}
            currentPage={currentPage}
            pageSize={itemsPerPage}
            totalCount={getCardsData?.pagination.totalItems || 4}
          />
        </>
      )}
      {isEmpty && !isOwner && (
        <Typography className={s.emptyTypography} variant={'subtitle1'}>
          This pack is empty.
        </Typography>
      )}
    </div>
  )
}
