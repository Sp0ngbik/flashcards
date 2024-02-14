import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { deckColumns } from '@/common/const'
import { Loader } from '@/common/ui/loader'
import { Pagination } from '@/common/ui/pagination'
import { Table, TableBody } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import { Typography } from '@/common/ui/typography'
import { useDeckFilter } from '@/pages/decs/hooks/useDeckFIlter'
import DeckHeader from '@/pages/decs/ui/deckHeader/deckHeader'
import DeckRow from '@/pages/decs/ui/deckRow/deckRow'

import s from './decks.module.scss'

const Decks = () => {
  const location = useLocation()

  useEffect(() => {
    return () => {
      sessionStorage.setItem('lastLocation', location.pathname + location.search)
    }
  }, [location])

  const {
    currentPage,
    deckData,
    deckIsFetching,
    itemsPerPage,
    me,
    onChangeCurrentPage,
    orderBy,
    setItemsPerPage,
    setSortedBy,
  } = useDeckFilter()

  const navigate = useNavigate()
  const defaultPaginationValue = 10

  const openDeckHandler = (id: string) => {
    navigate(`/cards/${id}`)
  }

  const learnDeckHandler = (id: string) => {
    navigate(`/cards/${id}/learn`)
  }

  const isOwner = (userId: string) => {
    return userId === me?.id
  }

  return (
    <div className={s.deckWrapper}>
      <DeckHeader />
      {deckData?.items?.length ? (
        <Table>
          <TableHeader columns={deckColumns} onSort={setSortedBy} sort={orderBy} />
          <TableBody>
            {deckIsFetching && <Loader smallVersion transparentBackground />}
            {deckData?.items?.map(deck => {
              return (
                <DeckRow
                  deck={deck}
                  isOwner={isOwner(deck.userId)}
                  key={deck.id}
                  learnDeck={learnDeckHandler}
                  openDeck={openDeckHandler}
                />
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <>
          <Typography className={s.deckText} variant={'subtitle1'}>
            No content with these terms...
          </Typography>
        </>
      )}
      <Pagination
        changeCurrentPage={onChangeCurrentPage}
        changeItemsPerPage={setItemsPerPage}
        className={s.paginationBlock}
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalCount={deckData?.pagination.totalItems ?? defaultPaginationValue}
      />
    </div>
  )
}

export default Decks
