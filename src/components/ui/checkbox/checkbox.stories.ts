import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

const meta = {
  argTypes: {},
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckBoxUnchecked: Story = {
  args: {
    checked: false,
    disabled: false,
  },
}

export const CheckBoxChecked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
}

export const WithLabel: Story = {
  args: {
    checked: false,
    disabled: false,
    text: 'Accept terms and conditions.',
  },
}

export const WithLabelChecked: Story = {
  args: {
    checked: true,
    disabled: false,
    text: 'Accept terms and conditions.',
  },
}
