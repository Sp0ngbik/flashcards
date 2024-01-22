import { Delete, Edit, Play } from '@/assets'
import { Column } from '@/components/ui/table/table.stories'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'

import s from '@/components/ui/table/tableConstuctor/table.module.scss'

import { Table, TableBody, TableDataCell, TableRow } from './tableConstuctor'

export const TableComponent = () => {
  const columns: Array<Column> = []

  const options: Option[] = []

  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {options.map(t => {
          return (
            <TableRow key={t.title}>
              <TableDataCell>
                <span className={s.tableDataContent}>
                  {t.image && <img alt={'image'} className={s.tableImage} src={t.image} />}
                  {t.title}
                </span>
              </TableDataCell>
              <TableDataCell>{t.cardsCount}</TableDataCell>
              <TableDataCell>{t.updated}</TableDataCell>
              <TableDataCell>{t.createdBy}</TableDataCell>
              <TableDataCell>
                <Play />
                <Edit />
                <Delete />
              </TableDataCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

type Option = {
  [key: string]: number | string | undefined
  cardsCount: number
  createdBy: string
  image?: string
  title: string
  updated: string
}
