import type { Meta, StoryObj } from '@storybook/react'

import TextField from '@/components/ui/textField/textField'

const meta = {
  argTypes: {
    disabled: {
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
    label: 'Primary input',
    placeholder: 'Primary input',
    variant: 'text',
  },
}
export const PrimaryError: Story = {
  args: {
    errorMessage: 'Primary Error',
    label: 'Primary Error',
    placeholder: 'Primary input',
    variant: 'text',
  },
}
export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    label: 'Primary Disabled',
    placeholder: 'Primary Disabled',
    variant: 'text',
  },
}
export const PasswordInput: Story = {
  args: {
    label: 'Password Input',
    placeholder: 'Password Input',
    variant: 'password',
  },
}
export const PasswordError: Story = {
  args: {
    errorMessage: 'Wrong password',
    label: 'Password Error',
    placeholder: 'Password Error',
    variant: 'password',
  },
}
export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password Disabled',
    placeholder: 'Password Disabled',
    variant: 'password',
  },
}
export const SearchInput: Story = {
  args: {
    label: 'Search Input',
    placeholder: 'Search Input',
    variant: 'search',
  },
}
export const SearchError: Story = {
  args: {
    errorMessage: 'Search error',
    label: 'Search Error',
    placeholder: 'Search Error',
    variant: 'search',
  },
}
export const SearchDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search Disabled',
    variant: 'search',
  },
}
