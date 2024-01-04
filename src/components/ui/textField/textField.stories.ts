import type { Meta, StoryObj } from '@storybook/react'

import TextField from '@/components/ui/textField/textField'

const meta = {
  argTypes: {
    error: {
      control: { type: 'radio' },
      options: [true, false],
    },
    variant: {
      control: { type: 'radio' },
      options: ['password', 'text'],
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
    placeholder: 'Input',
    variant: 'text',
  },
}
