import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from '@/components/ui/dropDownMenu/dropDownMenu'

const meta = {
  argTypes: {},
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuProfile: Story = {
  args: {
    defaultOpen: true,
    disabled: false,
  },
}

export const DropdownMenuCard: Story = {
  args: {
    defaultOpen: true,
    disabled: false,
    flag: 'editCard',
  },
}
