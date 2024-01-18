import { Delete, Edit, Play } from '@/assets'
import defaultAvatar from '@/assets/image/defaultAvatar.png'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'
import { useHandleSort } from '@/components/ui/table/utils/useHandleSort'

import s from '@/components/ui/table/tableConstuctor/table.module.scss'

import { Table, TableBody, TableDataCell, TableRow } from './tableConstuctor'

export const TableStory = () => {
  const options = [
    {
      cardsCount: 10,
      createdBy: 'John Doe',
      title: 'A',
      updated: '2023-07-07',
    },
    {
      cardsCount: 5,
      createdBy: 'Jane Smith',
      title: 'B',
      updated: '2023-07-06',
    },
    {
      cardsCount: 8,
      createdBy: 'Alice Johnson',
      title: 'C',
      updated: '2023-07-05',
    },
    {
      cardsCount: 3,
      createdBy: 'Bob Anderson',
      title: 'D',
      updated: '2023-07-07',
    },
    {
      cardsCount: 12,
      createdBy: 'Emma Davis',
      title: 'E',
      updated: '2023-07-04',
    },
    {
      cardsCount: 1,
      createdBy: '01',
      image: defaultAvatar,
      title: 'Books',
      updated: '2023-01-31T12:45:00.000Z',
    },
  ]

  const { columns, setSort, sort, sortHandler } = useHandleSort(options)

  return (
    <Table>
      <TableHeader columns={columns} onClick={sortHandler} onSort={setSort} sort={sort} />
      <TableBody>
        {sortHandler().map(t => {
          return (
            <TableRow key={t.title}>
              <TableDataCell>
                <span className={s.tableDataContent}>
                  {t.image && (
                    <img alt={'image'} src={t.image} style={{ height: '50px', width: '150px' }} />
                  )}
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
