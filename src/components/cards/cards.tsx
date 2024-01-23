import { Table, TableBody } from '@/components/ui/table/tableConstuctor'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'
import TextField from '@/components/ui/textField/textField'

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
      <TextField label={'Search'} placeholder={'Input search'} variant={'search'} />
      <Table>
        <TableHeader columns={columns} />
        <TableBody></TableBody>
      </Table>
    </div>
  )
}

export default Cards
