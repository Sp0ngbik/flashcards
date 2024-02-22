import { useState } from 'react'
import { toast } from 'react-toastify'

import { Delete, Edit } from '@/assets'
import noImageCover from '@/assets/image/noImage.png'
import { Grade } from '@/common/ui/grade/grade'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { Typography } from '@/common/ui/typography'
import { UpdateCard } from '@/features/cards/updateCard/updateCard'
import { DeleteForm } from '@/features/deck/deleteForm'
import { ErrorResponse } from '@/services/auth/auth.types'
import { useDeleteCardMutation, useGetCardByIdQuery } from '@/services/cards/cards.service'
import { RootObjectItems } from '@/services/decks/decks.types'
import { useWindowSize } from '@uidotdev/usehooks'

import s from './cardRow.module.scss'
type CardRowProps = {
  card: RootObjectItems
  isOwner: boolean
}

export const CardRow = ({ card, isOwner }: CardRowProps) => {
  const [deleteCard] = useDeleteCardMutation()
  const { data: cardById } = useGetCardByIdQuery({ id: card.id })
  const [isDeleteForm, setIsDeleteForm] = useState(false)
  const [isOpenCardEdit, setIsOpenCardEdit] = useState(false)

  const openEditModeHandler = () => {
    setIsOpenCardEdit(true)
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

  const size = useWindowSize()
  const width = size?.width

  return (
    <TableRow key={card.id}>
      <UpdateCard
        card={cardById}
        id={card.id}
        isOpen={isOpenCardEdit}
        onOpenChange={setIsOpenCardEdit}
        title={'Update Card'}
      />
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
          {width >= 765 ? (
            card.questionImg ? (
              <img alt={'image'} className={s.rowImage} src={card.questionImg} />
            ) : (
              <img alt={'image'} className={s.rowImage} src={noImageCover} />
            )
          ) : null}
          <Typography className={s.cardTypography} variant={'subtitle2'}>
            {card.question}
          </Typography>
        </span>
      </TableDataCell>
      <TableDataCell>
        <span className={s.tableDataContent}>
          {width >= 765 ? (
            card.answerImg ? (
              <img alt={'image'} className={s.rowImage} src={card.answerImg} />
            ) : (
              <img alt={'image'} className={s.rowImage} src={noImageCover} />
            )
          ) : null}
          <Typography className={s.cardTypography} variant={'subtitle2'}>
            {card.answer}
          </Typography>
        </span>
      </TableDataCell>
      <TableDataCell>{new Date(card.created).toLocaleDateString('ru-RU')}</TableDataCell>
      <TableDataCell>
        <Grade count={card.grade} />
      </TableDataCell>
      {isOwner && (
        <TableDataCell>
          <div className={s.btnsArea}>
            <Edit className={s.icon} onClick={openEditModeHandler} />
            <Delete className={s.icon} onClick={onOpenDeleteCardForm} />
          </div>
        </TableDataCell>
      )}
    </TableRow>
  )
}
