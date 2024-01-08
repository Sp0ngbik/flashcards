import { Header } from '@/components/ui/header'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    isLoggedIn: {
      control: { type: 'radio' },
      options: [true, false],
    },
  },
  component: Header,
  title: 'Components/Header',
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof meta>

export default meta

export const LoggedHeader: Story = {
  args: {
    isLoggedIn: true,
  },
}

export const LoggedOffHeader: Story = {
  args: {
    isLoggedIn: false,
  },
}
