import type { Meta, StoryObj } from '@storybook/react'

import { Play } from '@/assets'
import { Delete } from '@/assets/icons/delete'
import { Edit } from '@/assets/icons/edit'
import userAvatar from '@/assets/image/defaultAvatar.png'
import { Table, TableBody, TableDataCell, TableRow } from '@/components/ui/table/tableConstuctor'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'
import { useHandleSort } from '@/components/ui/table/utils/useHandleSort'

import s from './tableConstuctor/table.module.scss'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableStory: Story = {
  args: {},
  render: args => {
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
        image: userAvatar,
        title: 'Books',
        updated: '2023-01-31T12:45:00.000Z',
      },
    ]

    const { columns, setSort, sort, sortHandler } = useHandleSort(options)

    return (
      <Table {...args}>
        <TableHeader columns={columns} onClick={sortHandler} onSort={setSort} sort={sort} />
        <TableBody>
          {sortHandler().map(t => {
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
  },
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type Column = {
  key: string
  sortable?: boolean
  title: string
}
