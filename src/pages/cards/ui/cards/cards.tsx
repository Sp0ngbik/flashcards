import { NavLink, useParams } from 'react-router-dom'

import { Dots } from '@/assets'
import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Button } from '@/common/ui/button'
import { DropdownMenu } from '@/common/ui/dropDownMenu'
import { Pagination } from '@/common/ui/pagination'
import { Table, TableBody } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'
import { CreateNewCard } from '@/features/cards/createNewCard/createNewCard'
import { UpdateDeck } from '@/features/deck/updateDeck/updateDeck'
import { useCardFilter } from '@/pages/cards/hooks/useCardFilter'
import { CardRow } from '@/pages/cards/ui/card/cardRow'

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
  const {
    backDeck,
    currentPage,
    deleteDeckHandler,
    getCardByIdData,
    getCardsData,
    isEmpty,
    isOpen,
    isOpenEdit,
    isOwner,
    itemsPerPage,
    navigate,
    onAddNewCardHandler,
    onChangeCurrentPage,
    onChangeName,
    onEditClickHandler,
    orderBy,
    searchBy,
    setIsOpen,
    setIsOpenEdit,
    setItemsPerPage,
    setSortedBy,
  } = useCardFilter(id)

  return (
    <div className={s.cardWrapper}>
      <UpdateDeck
        deck={getCardByIdData}
        isOpen={isOpenEdit}
        onOpenChange={setIsOpenEdit}
        title={'Update Deck'}
      />
      <CreateNewCard id={id} isOpen={isOpen} onOpenChange={setIsOpen} title={'Add New Card'} />
      <NavLink className={s.backToDeck} to={`${backDeck}`}>
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </NavLink>
      <div className={s.cardsHeader}>
        <div>
          <div className={s.dropDownDiv}>
            <Typography variant={'h1'}>{getCardByIdData?.name}</Typography>
            <DropdownMenu
              deleteDeck={deleteDeckHandler}
              flag={'editCard'}
              onEditClick={onEditClickHandler}
            />

            <Dots />
          </div>
          <img alt={''} className={s.tableImage} src={getCardByIdData?.cover} />
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
