import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from '@/components/ui/dropDownMenu/dropDownMenu'

const meta = {
  argTypes: {
    defaultOpen: {
      control: { type: 'button' },
      options: [true, false],
    },
    disabled: {
      control: { type: 'button' },
      options: [true, false],
    },
    flag: {
      control: { type: 'button' },
      options: ['editCard', 'editProfile'],
    },
  },
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
