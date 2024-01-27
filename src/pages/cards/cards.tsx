import { useNavigate, useParams } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Button } from '@/common/ui/button'
import { Pagination } from '@/common/ui/pagination'
import { Table, TableBody, TableDataCell, TableRow } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'
import { useGetCardsQuery, useGetDeckByIdQuery } from '@/services/decks/decks.service.'

import s from './cards.module.scss'

const columns = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
]

const Cards = () => {
  const id = useParams<{ id: string }>()

  const { data: getCardsData } = useGetCardsQuery(id)
  const { data: getCardByIdData } = useGetDeckByIdQuery(id)

  console.log(getCardByIdData)
  const navigate = useNavigate()
  const backToDeckHandler = () => {
    navigate('/')
  }

  return (
    <div className={s.cardWrapper}>
      <Button
        className={s.backToDeck}
        icon={<ArrowBack />}
        onClick={backToDeckHandler}
        variant={'link'}
      >
        Back to Decks List
      </Button>
      <div className={s.cardsHeader}>
        <div>
          <Typography variant={'h1'}>{getCardByIdData?.name}</Typography>
          <img className={s.tableImage} src={getCardByIdData?.cover} />
        </div>
        <Button variant={'primary'}>Learn to Pack</Button>
      </div>
      <TextField label={'Search'} placeholder={'Input search'} variant={'search'} />
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {getCardsData?.items?.map(card => {
            return (
              <TableRow key={card.deckId}>
                <TableDataCell>
                  {card.questionImg && (
                    <img alt={'image'} className={s.tableImage} src={card.questionImg} />
                  )}
                  {card.question}
                </TableDataCell>
                <TableDataCell>
                  {card.answerImg && (
                    <img alt={'image'} className={s.tableImage} src={card.answerImg} />
                  )}
                  {card.answer}
                </TableDataCell>
                <TableDataCell>{new Date(card.created).toLocaleDateString('ru-RU')}</TableDataCell>
                <TableDataCell>{card.grade}</TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination
        changeCurrentPage={() => {}}
        changeItemsPerPage={() => {}}
        currentPage={1}
        pageSize={4}
        totalCount={5}
      />
    </div>
  )
}

export default Cards
