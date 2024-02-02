import { useMemo, useState } from 'react'
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Delete, Dots, Edit } from '@/assets'
import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { useDebounce } from '@/common/hooks/useDebounce'
import { Button } from '@/common/ui/button'
import { DropdownMenu } from '@/common/ui/dropDownMenu'
import { Grade } from '@/common/ui/grade/grade'
import { Pagination } from '@/common/ui/pagination'
import { Sort } from '@/common/ui/table/table.stories'
import { Table, TableBody, TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'
import { CreateNewCard } from '@/features/cards/createNewCard/createNewCard'
import { useMeQuery } from '@/services/auth/auth.sevice'
import { useDeleteCardMutation, useGetCardsQuery } from '@/services/cards/cards.service'
import { useDeleteDeckMutation, useGetDeckByIdQuery } from '@/services/decks/decks.service.'

import s from './cards.module.scss'

const columns = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
  { key: 'icons', title: '' },
]

export const Cards = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const { data: me } = useMeQuery()
  const [deleteCard] = useDeleteCardMutation()

  const backDeck = sessionStorage.getItem('lastLocation')
  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search)
  }
  const onChangeCurrentPage = (value: number) => {
    changeSearchHandler('currentPage', value.toString())
  }
  const setItemsPerPage = (value: number) => {
    changeSearchHandler('itemsPerPage', value.toString())
  }
  const orderBy = JSON.parse(search.get('orderBy') || '""')
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
  const searchBy = search.get('name') || ''
  const debounceName = useDebounce(searchBy, 2000)
  const onChangeName = (value: string) => {
    changeSearchHandler('name', value)
  }
  const currentPage = Number(search.get('currentPage') || 1)
  const itemsPerPage = Number(search.get('itemsPerPage') || '4')
  const { data: getCardsData } = useGetCardsQuery({
    currentPage,
    id,
    itemsPerPage,
    orderBy: sortedString,
    question: debounceName,
  })
  const { data: getCardByIdData } = useGetDeckByIdQuery({ id })

  const onAddNewCardHandler = () => {
    setIsOpen(true)
  }
  const isOwner = me?.id === getCardByIdData?.userId
  const isEmpty = getCardByIdData?.cardsCount === 0
  const [deleteDeck] = useDeleteDeckMutation()
  const deleteDeckHandler = async () => {
    if (id) {
      await deleteDeck({ id }).unwrap()
      navigate(`${backDeck}`)
    }
  }

  return (
    <div className={s.cardWrapper}>
      <CreateNewCard id={id} isOpen={isOpen} onOpenChange={setIsOpen} title={'Add New Card'} />
      <NavLink className={s.backToDeck} to={`${backDeck}`}>
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </NavLink>
      <div className={s.cardsHeader}>
        <div>
          <div className={s.dropDownDiv}>
            <Typography variant={'h1'}>{getCardByIdData?.name}</Typography>
            {isOwner && (
              <DropdownMenu deleteDeck={deleteDeckHandler} flag={'editCard'} logout={() => {}} />
            )}
            <Dots />
          </div>
          <img alt={'321'} className={s.tableImage} src={getCardByIdData?.cover} />
        </div>
        {!isOwner && (
          <Button onClick={() => navigate(`/cards/${id}/learn`)} variant={'primary'}>
            Learn to Pack
          </Button>
        )}
        {isOwner && !isEmpty && (
          <Button onClick={onAddNewCardHandler} variant={'primary'}>
            Add New Card
          </Button>
        )}
      </div>
      {!isEmpty && (
        <TextField
          label={'Search'}
          onValueChange={onChangeName}
          placeholder={'Input search'}
          value={searchBy}
          variant={'search'}
        />
      )}
      {!isEmpty && (
        <>
          <Table>
            <TableHeader columns={columns} onSort={setSortedBy} sort={orderBy} />
            <TableBody>
              {getCardsData?.items?.map(card => {
                return (
                  <TableRow key={card.id}>
                    <TableDataCell>
                      <span className={s.tableDataContent}>
                        {card.questionImg && (
                          <img alt={'image'} className={s.tableImage} src={card.questionImg} />
                        )}
                        {card.question}
                      </span>
                    </TableDataCell>
                    <TableDataCell>
                      <span className={s.tableDataContent}>
                        {card.answerImg && (
                          <img alt={'image'} className={s.tableImage} src={card.answerImg} />
                        )}
                        {card.answer}
                      </span>
                    </TableDataCell>
                    <TableDataCell>
                      {new Date(card.created).toLocaleDateString('ru-RU')}
                    </TableDataCell>
                    <TableDataCell>
                      <Grade count={card.grade} />
                    </TableDataCell>
                    <TableDataCell>
                      {isOwner && (
                        <>
                          <Edit className={s.icon} />
                          <Delete className={s.icon} onClick={() => deleteCard({ id: card.id })} />
                        </>
                      )}
                    </TableDataCell>
                  </TableRow>
                )
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
      {isEmpty && isOwner && (
        <div className={s.addCardDown}>
          <Typography className={s.emptyTypography} variant={'subtitle1'}>
            This pack is empty. Click add new card to fill this pack{' '}
          </Typography>
          <Button onClick={onAddNewCardHandler} variant={'primary'}>
            Add New Card
          </Button>
        </div>
      )}
    </div>
  )
}
