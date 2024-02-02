import { Pagination } from '@/common/ui/pagination/pagination'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    pageSize: { control: { max: 12, min: 1, type: 'number' } },
    siblingCount: { control: { max: 5, min: 1, type: 'number' } },
    totalCount: { control: { max: 1000, min: 1, type: 'number' } },
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const PaginationPrimary: Story = {
  args: { currentPage: 1, pageSize: 4, siblingCount: 1, totalCount: 250 },
}

export const PaginationWithMoreSiblings: Story = {
  args: { currentPage: 1, pageSize: 12, siblingCount: 3, totalCount: 250 },
}
