import { Pagination } from '@/components/ui/pagination'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
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
  args: { siblingCount: 1, totalCount: 250 },
}

export const PaginationWithMoreSiblings: Story = {
  args: { siblingCount: 3, totalCount: 250 },
}
