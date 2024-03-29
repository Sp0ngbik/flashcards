import { useState } from 'react'
import { toast } from 'react-toastify'

import { Delete, Edit, Play } from '@/assets'
import noImageCover from '@/assets/image/noImage.png'
import { mobileWidth } from '@/common/const'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { Typography } from '@/common/ui/typography'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import DeckMobile from '@/pages/decs/ui/decks/deckMobile/deckMobile'
import { ErrorResponse } from '@/services/auth/auth.types'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Deck } from '@/services/decks/decks.types'
import { useWindowSize } from '@uidotdev/usehooks'
import { clsx } from 'clsx'

import s from './deckRow.module.scss'

type DeckRowProps = {
  deck: Deck
  isOwner: boolean
  learnDeck: (id: string) => void
  openDeck: (id: string) => void
}

const DeckRow = ({ deck, isOwner, learnDeck, openDeck }: DeckRowProps) => {
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()
  const [isDeleteForm, setDeleteForm] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const isEmpty = deck.cardsCount === 0
  const classNames = {
    icon: clsx(s.icon, isDeckBeingDeleted && s.disableIcon),
    iconPlay: clsx(s.icon, isEmpty && s.disableIcon),
  }

  const onCloseDeleteForm = () => {
    setDeleteForm(false)
  }

  const openDeckHandler = () => {
    openDeck(deck.id)
  }
  const deleteDeckHandler = () => {
    setDeleteForm(true)
  }

  const learnDeckHandler = () => {
    learnDeck(deck.id)
  }

  const onOpenEditMode = () => {
    setIsOpenEdit(true)
  }

  const onDeleteDeck = async (id: string) => {
    try {
      if (id) {
        await toast.promise(deleteDeck(id).unwrap(), {
          pending: 'In progress',
          success: 'Deck was deleted',
        })
      }
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? "Couldn't Delete")
    }
  }

  const size = useWindowSize()
  const width = size?.width
  const mobileVersion = width && width >= mobileWidth

  return (
    <>
      <TableRow className={s.tableRow} key={deck.id}>
        <UpdateDeck
          deck={deck}
          isOpen={isOpenEdit}
          onOpenChange={setIsOpenEdit}
          title={'Update Deck'}
        />
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
        {!mobileVersion ? (
          <DeckMobile deck={deck} />
        ) : (
          <>
            <TableDataCell>
              <span className={s.tableDataContent} onClick={openDeckHandler}>
                {deck.cover ? (
                  <img alt={'image'} className={s.tableImage} src={deck.cover} />
                ) : (
                  <img alt={'image'} className={s.tableImage} src={noImageCover} />
                )}
                <Typography variant={'subtitle2'}>{deck.name}</Typography>
              </span>
            </TableDataCell>

            <TableDataCell>{deck.cardsCount}</TableDataCell>
            <TableDataCell>{new Date(deck.updated).toLocaleDateString('ru-RU')}</TableDataCell>
            <TableDataCell>{deck.author.name}</TableDataCell>
          </>
        )}
        <TableDataCell className={s.buttonsBlock}>
          {isOwner ? (
            <div className={s.buttonContent}>
              <Edit className={s.icon} onClick={onOpenEditMode} />
              <Play className={classNames.iconPlay} onClick={learnDeckHandler} />
              <Delete className={classNames.icon} onClick={deleteDeckHandler} />
            </div>
          ) : (
            <div className={s.buttonContent}>
              <Play className={classNames.iconPlay} onClick={learnDeckHandler} />
            </div>
          )}
        </TableDataCell>
      </TableRow>
    </>
  )
}

export default DeckRow
