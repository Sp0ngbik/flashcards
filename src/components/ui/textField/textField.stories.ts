import type { Meta, StoryObj } from '@storybook/react'

import TextField from '@/components/ui/textField/textField'

const meta = {
  argTypes: {
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
    error: {
      control: { type: 'radio' },
      options: [true, false],
    },
    variant: {
      control: { type: 'radio' },
      options: ['password', 'text', 'search'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryInput: Story = {
  args: {
    variant: 'text',
  },
}
export const PrimaryError: Story = {
  args: {
    error: true,
    variant: 'text',
  },
}
export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    variant: 'text',
  },
}
export const PasswordInput: Story = {
  args: {
    variant: 'password',
  },
}
export const PasswordError: Story = {
  args: {
    error: true,
    variant: 'password',
  },
}
export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    variant: 'text',
  },
}
export const SearchInput: Story = {
  args: {
    variant: 'search',
  },
}
export const SearchError: Story = {
  args: {
    error: true,
    variant: 'search',
  },
}
export const SearchDisabled: Story = {
  args: {
    disabled: true,
    variant: 'search',
  },
}
