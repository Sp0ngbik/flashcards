import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select'

const meta = {
  argTypes: {
    defaultOpen: {
      control: { type: 'radio' },
      options: [true, false],
    },
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

const optionsForStory = ['Vadik', 'Vlad', 'Serega', 'Ilya']

export default meta
type Story = StoryObj<typeof meta>

export const SelectDefault: Story = {
  args: {
    label: 'Select Default',
    options: optionsForStory,
  },
}

export const SelectActive: Story = {
  args: {
    defaultOpen: true,
    label: 'Select Active',
    options: optionsForStory,
  },
}

export const SelectDisabled: Story = {
  args: {
    disabled: true,
    label: 'Select Disabled',
    options: optionsForStory,
  },
}
