import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/common/ui/tabSwitcher/tabSwitcher'

const meta = {
  argTypes: {
    tabs: {
      disabled: {
        control: { type: 'button' },
        options: [true, false],
      },
      title: {
        control: { type: 'button' },
        options: [''],
      },
      value: {
        control: { type: 'button' },
        options: [''],
      },
    },
  },
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const TabSwitcherDemo: Story = {
  args: {
    tabs: [
      { title: 'Active', value: 'Active' },
      { title: 'Hello', value: 'Hello' },
      { title: 'Login', value: 'Login' },
      { title: 'Value', value: 'Value' },
      { title: 'Password', value: 'Password' },
    ],
  },
}

export const TabSwitcherDisable: Story = {
  args: {
    tabs: [
      { disabled: true, title: 'Active', value: 'Active' },
      { title: 'Hello', value: 'Hello' },
      { title: 'Login', value: 'Login' },
      { disabled: true, title: 'Value', value: 'Value' },
      { title: 'Password', value: 'Password' },
    ],
  },
}
