import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher'

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
      { title: 'Active', value: '' },
      { title: 'Hello', value: '' },
      { title: 'Login', value: '' },
      { title: 'Value', value: '' },
      { title: 'Password', value: '' },
    ],
  },
}

export const TabSwitcherDisable: Story = {
  args: {
    tabs: [
      { disabled: true, title: 'Active', value: '' },
      { title: 'Hello', value: '' },
      { title: 'Login', value: '' },
      { disabled: true, title: 'Value', value: '' },
      { title: 'Password', value: '' },
    ],
  },
}
