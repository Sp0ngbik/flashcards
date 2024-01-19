import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Components/Auth',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordAuth: Story = {
  args: {},
}
