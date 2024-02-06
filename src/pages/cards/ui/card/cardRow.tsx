import { useState } from 'react'
import { toast } from 'react-toastify'

import { Delete, Edit } from '@/assets'
import noImageCover from '@/assets/image/noImage.png'
import { Grade } from '@/common/ui/grade/grade'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { EditCardType } from '@/features/cards/cardForm/cardForm'
import { DeleteForm } from '@/features/deck/deleteForm'
import { ErrorResponse } from '@/services/auth/auth.types'
import { useDeleteCardMutation } from '@/services/cards/cards.service'
import { RootObjectItems } from '@/services/decks/decks.types'

import s from './cardRow.module.scss'
type CardRowProps = {
  card: RootObjectItems
  isOwner: boolean
  onEditCardClickHandler: (card: EditCardType) => void
}

export const CardRow = ({ card, isOwner, onEditCardClickHandler }: CardRowProps) => {
  const [deleteCard] = useDeleteCardMutation()
  const [isDeleteForm, setIsDeleteForm] = useState(false)
  const openEditModeHandler = () => {
    onEditCardClickHandler(card)
  }
  const cancelDeleteForm = () => {
    setIsDeleteForm(false)
  }
  const deleteCardCB = async (id: string) => {
    try {
      if (id) {
        await toast.promise(deleteCard({ id }).unwrap(), {
          pending: 'In progress',
          success: 'Card was deleted',
        })
      }
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? "Couldn't Delete")
    }
  }
  const onOpenDeleteCardForm = () => {
    setIsDeleteForm(true)
  }

  return (
    <TableRow key={card.id}>
      <DeleteForm
        cancel={cancelDeleteForm}
        deleteCB={deleteCardCB}
        id={card.id}
        isDeck={false}
        isOpen={isDeleteForm}
        name={card.question}
        onOpenChange={setIsDeleteForm}
        title={'Delete card'}
      />
      <TableDataCell>
        <span className={s.tableDataContent}>
          {card.questionImg ? (
            <img alt={'image'} className={s.rowImage} src={card.questionImg} />
          ) : (
            <img alt={'image'} className={s.noImageCover} src={noImageCover} />
          )}
          {card.question}
        </span>
      </TableDataCell>
      <TableDataCell>
        <span className={s.tableDataContent}>
          {card.answerImg ? (
            <img alt={'image'} className={s.rowImage} src={card.answerImg} />
          ) : (
            <img alt={'image'} className={s.noImageCover} src={noImageCover} />
          )}
          {card.answer}
        </span>
      </TableDataCell>
      <TableDataCell>{new Date(card.created).toLocaleDateString('ru-RU')}</TableDataCell>
      <TableDataCell>
        <Grade count={card.grade} />
      </TableDataCell>
      <TableDataCell>
        {isOwner && (
          <>
            <Edit className={s.icon} onClick={openEditModeHandler} />
            <Delete className={s.icon} onClick={onOpenDeleteCardForm} />
          </>
        )}
      </TableDataCell>
    </TableRow>
  )
}
