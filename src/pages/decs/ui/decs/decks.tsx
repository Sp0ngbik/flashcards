import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Delete } from '@/assets'
import { Button } from '@/common/ui/button'
import { Loader } from '@/common/ui/loader/Loader'
import { Pagination } from '@/common/ui/pagination'
import { DoubleSlider } from '@/common/ui/slider'
import { TabSwitcher, TabType } from '@/common/ui/tabSwitcher'
import { Table, TableBody } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'
import { CreateNewDeck } from '@/features/deck/createNewDeck/createNewDeck'
import { EditDeckType } from '@/features/deck/deckForm/deckForm'
import DeleteForm from '@/features/deck/deleteForm/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck/updateDeck'
import { useDeckFilter } from '@/pages/decs/hooks/useDeckFIlter'
import DeckRow from '@/pages/decs/ui/deckRow/deckRow'

import s from './decks.module.scss'

const columns = [
  { key: 'name', sortable: true, title: 'Name' },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'CardsCount',
  },
  { key: 'updated', sortable: true, title: 'Last Updated' },
  { key: 'author.name', sortable: true, title: 'Created by' },
  {
    key: '',
    sortable: true,
    title: '',
  },
]

const Decks = () => {
  const location = useLocation()

  useEffect(() => {
    return () => {
      sessionStorage.setItem('lastLocation', location.pathname + location.search)
    }
  }, [location])
  const {
    clearFilter,
    currentPage,
    deckData,
    deckIsLoading,
    deleteDeck,
    getCurrentTab,
    isDeckBeingDeleted,
    itemsPerPage,
    maxCards,
    me,
    minCards,
    minMaxValues,
    onChangeCurrentPage,
    onChangeName,
    onChangeSliderValues,
    onTabValueChange,
    orderBy,
    searchBy,
    setItemsPerPage,
    setSortedBy,
  } = useDeckFilter()
  const navigate = useNavigate()
  const defaultPaginationValue = 10
  const [deck, setDeck] = useState<EditDeckType>({ cover: null, isPrivate: false, name: '' })
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isDeleteForm, setDeleteForm] = useState(false)

  const onCreateDeck = () => {
    setIsOpen(true)
  }

  if (deckIsLoading) {
    return <Loader />
  }

  const tabs: TabType[] = [
    { title: 'My Cards', value: 'userCards' },
    { title: 'All Cards', value: 'allCards' },
  ]

  const openDeckHandler = (id: string) => {
    navigate(`/cards/${id}`)
  }

  const learnDeckHandler = (id: string) => {
    navigate(`/cards/${id}/learn`)
  }
  const onOpenEditMode = (currentDeck: EditDeckType) => {
    setDeck(currentDeck)
    setIsOpenEdit(true)
  }

  const ownerValidation = (userId: string) => {
    return userId === me?.id
  }
  const onOpenDeleteForm = () => {
    setDeleteForm(true)
  }
  const onCloseDeleteForm = () => {
    setDeleteForm(false)
  }
  const onDeleteDeck = (id: string) => {
    deleteDeck(id)
  }

  return (
    <div className={s.deckWrapper}>
      <CreateNewDeck isOpen={isOpen} onOpenChange={setIsOpen} title={'Add New Deck'} />
      <UpdateDeck
        deck={deck}
        isOpen={isOpenEdit}
        onOpenChange={setIsOpenEdit}
        title={'Update Deck'}
      />

      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks List</Typography>
        <Button onClick={onCreateDeck}>Add New Deck</Button>
      </div>
      <div className={s.deckFilter}>
        <div>
          <TextField
            label={'Search'}
            onValueChange={onChangeName}
            placeholder={'Input search'}
            value={searchBy}
            variant={'search'}
          />
        </div>
        <TabSwitcher
          defaultValue={getCurrentTab || tabs[0].value}
          label={'Show decks cards'}
          onValueChange={onTabValueChange}
          tabs={tabs}
        />
        <div>
          <Typography className={s.sliderLabel} variant={'body2'}>
            Number of cards
          </Typography>
          <DoubleSlider
            changeSliderValue={onChangeSliderValues}
            defaultValue={[minCards, maxCards]}
            max={minMaxValues?.max}
            min={minMaxValues?.min}
          />
        </div>
        <Button
          icon={<Delete className={s.deleteIcon} />}
          onClick={clearFilter}
          variant={'secondary'}
        >
          Clear Filter
        </Button>
      </div>
      <Table>
        <TableHeader columns={columns} onSort={setSortedBy} sort={orderBy} />
        <TableBody>
          {deckData?.items?.map(deck => {
            return (
              <>
                <DeleteForm
                  cancel={onCloseDeleteForm}
                  deleteCB={onDeleteDeck}
                  id={deck.id}
                  isOpen={isDeleteForm}
                  key={deck.id}
                  name={deck.name}
                  onOpenChange={setDeleteForm}
                  title={'Delete Pack'}
                />
                <DeckRow
                  deck={deck}
                  isDeleted={isDeckBeingDeleted}
                  isOwner={ownerValidation(deck.userId)}
                  key={deck.id}
                  learnDeck={learnDeckHandler}
                  openDeck={openDeckHandler}
                  openDeleteForm={onOpenDeleteForm}
                  openEditMode={onOpenEditMode}
                />
              </>
            )
          })}
        </TableBody>
      </Table>
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
