import { useState } from 'react'

import { Delete, Edit } from '@/assets'
import { Grade } from '@/common/ui/grade/grade'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { EditCardType } from '@/features/cards/cardForm/cardForm'
import { DeleteForm } from '@/features/deck/deleteForm'
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
  const [isDeleteForm, setDeleteForm] = useState(false)
  const openEditModeHandler = () => {
    onEditCardClickHandler(card)
  }
  const cancelDeleteForm = () => {
    setDeleteForm(false)
  }
  const deleteCardCB = (id: string) => {
    deleteCard({ id })
  }
  const onOpenDeleteCardForm = () => {
    setDeleteForm(true)
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
        onOpenChange={setDeleteForm}
        title={'Delete card'}
      />
      <TableDataCell>
        <span className={s.tableDataContent}>
          {card.questionImg && <img alt={'image'} className={s.rowImage} src={card.questionImg} />}
          {card.question}
        </span>
      </TableDataCell>
      <TableDataCell>
        <span className={s.tableDataContent}>
          {card.answerImg && <img alt={'image'} className={s.rowImage} src={card.answerImg} />}
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
