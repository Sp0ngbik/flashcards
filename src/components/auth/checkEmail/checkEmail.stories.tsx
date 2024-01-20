import type { Meta, StoryObj } from '@storybook/react'

import CheckEmail from './checkEmail'

const meta = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Components/Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailAuth: Story = {
  args: { email: 'yourmail@gmail.ru' },
}
