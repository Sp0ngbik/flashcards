import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from '@/components/ui/checkbox/checkbox'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['checkbox', 'withLabel'],
    },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckBox: Story = {
  args: {
    variant: 'checkbox',
  },
}

export const withLabel: Story = {
  args: {
    variant: 'withLabel',
  },
}
