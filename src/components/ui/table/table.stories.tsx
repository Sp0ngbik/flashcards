import type { Meta, StoryObj } from '@storybook/react'

import { Delete } from '@/assets/icons/delete'
import { Edit } from '@/assets/icons/edit'
import userAvatar from '@/assets/image/defaultAvatar.png'
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { PlayIcon } from '@radix-ui/react-icons'

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
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Cities',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Cars',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        image: userAvatar,
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Books',
      },
    ]

    return (
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Created By</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map(t => {
            return (
              <TableRow key={t.lastUpdated}>
                <TableDataCell>
                  <span>
                    {t.image && (
                      <img alt={'image'} src={t.image} style={{ height: '50px', width: '150px' }} />
                    )}
                    {t.name}
                  </span>
                </TableDataCell>
                <TableDataCell>{t.cardsNumber}</TableDataCell>
                <TableDataCell>{t.lastUpdated}</TableDataCell>
                <TableDataCell>{t.createdBy}</TableDataCell>
                <TableDataCell>
                  <PlayIcon />
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
