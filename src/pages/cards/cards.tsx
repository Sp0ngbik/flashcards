import { useNavigate } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Button } from '@/common/ui/button'
import { Pagination } from '@/common/ui/pagination'
import { Table, TableBody } from '@/common/ui/table/tableConstuctor'
import { TableHeader } from '@/common/ui/table/tableHeader/tableHeader'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'

import s from './cards.module.scss'

const columns = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
]

const Cards = () => {
  const navigete = useNavigate()
  const backToDeckHandler = () => {
    navigete('/')
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
        <Typography variant={'h1'}>Decks Name</Typography>
        <Button variant={'primary'}>Learn to Pack</Button>
      </div>
      <TextField label={'Search'} placeholder={'Input search'} variant={'search'} />
      <Table>
        <TableHeader columns={columns} />
        <TableBody></TableBody>
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
