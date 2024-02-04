import { Delete, Edit, Play } from '@/assets'
import { Button } from '@/common/ui/button'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { EditDeckType } from '@/features/deck/deckForm/deckForm'
import { Deck } from '@/services/decks/decks.types'
import { clsx } from 'clsx'

import s from './deckRow.module.scss'

type DeckRowProps = {
  deck: Deck
  isDeleted: boolean
  isOwner: boolean
  learnDeck: (id: string) => void
  openDeck: (id: string) => void
  openDeleteForm: (value: true) => void
  openEditMode: (deck: EditDeckType) => void
}

const DeckRow = ({
  deck,
  isDeleted,
  isOwner,
  learnDeck,
  openDeck,
  openDeleteForm,
  openEditMode,
}: DeckRowProps) => {
  const isEmpty = deck.cardsCount === 0
  const classNames = {
    icon: clsx(s.icon, isDeleted && s.disableIcon),
    iconPlay: clsx(s.icon, isEmpty && s.disableIcon),
  }

  const openDeckHandler = () => {
    openDeck(deck.id)
  }
  const deleteDeckHandler = () => {
    openDeleteForm(true)
  }

  const openEditModeHandler = () => {
    openEditMode(deck)
  }
  const learnDeckHandler = () => {
    learnDeck(deck.id)
  }

  return (
    <TableRow key={deck.id}>
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
