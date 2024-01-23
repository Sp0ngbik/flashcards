import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Table, TableBody } from '@/components/ui/table/tableConstuctor'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'
import TextField from '@/components/ui/textField/textField'
import { Typography } from '@/components/ui/typography'

import s from './cards.module.scss'

const columns = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
]

const Cards = () => {
  return (
    <div className={s.cardWrapper}>
      <Button className={s.backToDeck} icon={<ArrowBack />} variant={'link'}>
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
