import { useState } from 'react'

import { Delete, Edit, Play } from '@/assets'
import { Button } from '@/common/ui/button'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { EditDeckType } from '@/features/deck/deckForm'
import { DeleteForm } from '@/features/deck/deleteForm'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Deck } from '@/services/decks/decks.types'
import { clsx } from 'clsx'

import s from './deckRow.module.scss'

type DeckRowProps = {
  deck: Deck
  isOwner: boolean
  learnDeck: (id: string) => void
  openDeck: (id: string) => void
  openEditMode: (deck: EditDeckType) => void
}

const DeckRow = ({ deck, isOwner, learnDeck, openDeck, openEditMode }: DeckRowProps) => {
  const isEmpty = deck.cardsCount === 0
  const [isDeleteForm, setDeleteForm] = useState(false)
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()
  const classNames = {
    icon: clsx(s.icon, isDeckBeingDeleted && s.disableIcon),
    iconPlay: clsx(s.icon, isEmpty && s.disableIcon),
  }

  const onCloseDeleteForm = () => {
    setDeleteForm(false)
  }
  const onDeleteDeck = (id: string) => {
    deleteDeck(id)
  }
  const openDeckHandler = () => {
    openDeck(deck.id)
  }
  const deleteDeckHandler = () => {
    setDeleteForm(true)
  }

  const openEditModeHandler = () => {
    openEditMode(deck)
  }
  const learnDeckHandler = () => {
    learnDeck(deck.id)
  }

  return (
    <TableRow key={deck.id}>
      <DeleteForm
        cancel={onCloseDeleteForm}
        deleteCB={onDeleteDeck}
        id={deck.id}
        isDeck
        isOpen={isDeleteForm}
        key={deck.id}
        name={deck.name}
        onOpenChange={setDeleteForm}
        title={'Delete Pack'}
      />
      <TableDataCell>
        <Button className={s.tableDataContent} onClick={openDeckHandler} variant={'link'}>
          {deck.cover && <img alt={'image'} className={s.tableImage} src={deck.cover} />}
          {deck.name}
        </Button>
      </TableDataCell>
      <TableDataCell>{deck.cardsCount}</TableDataCell>
      <TableDataCell>{new Date(deck.updated).toLocaleDateString('ru-RU')}</TableDataCell>
      <TableDataCell>{deck.author.name}</TableDataCell>
      <TableDataCell>
        {isOwner ? (
          <>
            <Edit className={s.icon} onClick={openEditModeHandler} />
            <Play className={classNames.iconPlay} onClick={learnDeckHandler} />
            <Delete className={classNames.icon} onClick={deleteDeckHandler} />
          </>
        ) : (
          <Play className={classNames.iconPlay} onClick={learnDeckHandler} />
        )}
      </TableDataCell>
    </TableRow>
  )
}

export default DeckRow
