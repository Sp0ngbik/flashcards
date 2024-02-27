import { deckColumns } from '@/common/const'
import { TableDataCell } from '@/common/ui/table'
import { Typography } from '@/common/ui/typography'
import { Deck } from '@/services/decks/decks.types'

import s from './deckMobile.module.scss'
type DeckMobileProps = {
  deck: Deck
}

const DeckMobile = ({ deck }: DeckMobileProps) => {
  return (
    <>
      <TableDataCell className={s.deckCellMobile}>
        {deckColumns.map((el, index) => (
          <Typography key={index} variant={'subtitle2'}>
            {el.title}
          </Typography>
        ))}
      </TableDataCell>
      <TableDataCell className={`${s.deckCellMobile} ${s.deckContent}`}>
        <Typography variant={'body2'}>{deck.name}</Typography>
        <Typography variant={'body2'}>{deck.cardsCount}</Typography>
        <Typography variant={'body2'}>
          {new Date(deck.updated).toLocaleDateString('ru-RU')}
        </Typography>
        <Typography variant={'body2'}>{deck.author.name}</Typography>
      </TableDataCell>
    </>
  )
}

export default DeckMobile
