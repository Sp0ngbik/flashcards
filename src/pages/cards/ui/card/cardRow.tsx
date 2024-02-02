import { Delete, Edit } from '@/assets'
import { Grade } from '@/common/ui/grade/grade'
import { TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { EditCardType } from '@/features/cards/cardForm/cardForm'
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

  const openEditModeHandler = () => {
    onEditCardClickHandler(card)
  }

  return (
    <TableRow key={card.id}>
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
            <Delete className={s.icon} onClick={() => deleteCard({ id: card.id })} />
          </>
        )}
      </TableDataCell>
    </TableRow>
  )
}
