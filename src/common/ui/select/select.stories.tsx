import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/common/ui/select/select'
import { SelectTextItem } from '@/common/ui/select/selectItem'

const meta = {
  argTypes: {
    defaultValue: { control: { type: 'text' } },
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'pagination'],
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectPrimary: Story = {
  args: {},
  render: () => {
    return (
      <Select defaultValue={'1'} label={'Select Primary'}>
        <SelectTextItem value={'1'}> 1</SelectTextItem>
        <SelectTextItem value={'2'}>2</SelectTextItem>
      </Select>
    )
  },
}

export const SelectWithValues: Story = {
  args: {},
  render: () => (
    <Select defaultValue={'1'}>
      <SelectTextItem value={'1'}>1</SelectTextItem>
      <SelectTextItem value={'2'}>2</SelectTextItem>
      <SelectTextItem value={'3'}>3</SelectTextItem>
      <SelectTextItem value={'4'}>4</SelectTextItem>
      <SelectTextItem value={'5'}>5</SelectTextItem>
    </Select>
  ),
}

export const SelectActive: Story = {
  args: {},
  render: () => (
    <Select defaultValue={'1'} open>
      <SelectTextItem value={'1'}>1</SelectTextItem>
      <SelectTextItem value={'2'}>2</SelectTextItem>
      <SelectTextItem value={'3'}>3</SelectTextItem>
      <SelectTextItem value={'4'}>4</SelectTextItem>
      <SelectTextItem value={'5'}>5</SelectTextItem>
    </Select>
  ),
}

export const SelectDisabled: Story = {
  args: {},
  render: () => (
    <Select defaultValue={'1'} disabled>
      <SelectTextItem value={'1'}>1</SelectTextItem>
      <SelectTextItem value={'2'}>2</SelectTextItem>
      <SelectTextItem value={'3'}>3</SelectTextItem>
      <SelectTextItem value={'4'}>4</SelectTextItem>
      <SelectTextItem value={'5'}>5</SelectTextItem>
    </Select>
  ),
}

export const SelectPagination: Story = {
  args: {},
  render: () => (
    <Select defaultValue={'1'} variant={'pagination'}>
      <SelectTextItem value={'1'}>1</SelectTextItem>
      <SelectTextItem value={'2'}>2</SelectTextItem>
      <SelectTextItem value={'3'}>3</SelectTextItem>
      <SelectTextItem value={'4'}>4</SelectTextItem>
      <SelectTextItem value={'5'}>5</SelectTextItem>
    </Select>
  ),
}

export const SelectPaginationActive: Story = {
  args: {},
  render: () => (
    <Select defaultOpen defaultValue={'1'} variant={'pagination'}>
      <SelectTextItem value={'1'}>1</SelectTextItem>
      <SelectTextItem value={'2'}>2</SelectTextItem>
      <SelectTextItem value={'3'}>3</SelectTextItem>
      <SelectTextItem value={'4'}>4</SelectTextItem>
      <SelectTextItem value={'5'}>5</SelectTextItem>
    </Select>
  ),
}

export const SelectPaginationDisabled: Story = {
  args: {},
  render: () => (
    <Select defaultValue={'1'} disabled variant={'pagination'}>
      <SelectTextItem value={'1'}>1</SelectTextItem>
      <SelectTextItem value={'2'}>2</SelectTextItem>
      <SelectTextItem value={'3'}>3</SelectTextItem>
      <SelectTextItem value={'4'}>4</SelectTextItem>
      <SelectTextItem value={'5'}>5</SelectTextItem>
    </Select>
  ),
}
