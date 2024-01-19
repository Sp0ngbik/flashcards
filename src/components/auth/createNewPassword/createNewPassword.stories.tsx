import CreateNewPassword from '@/components/auth/createNewPassword/createNewPassword'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Components/Auth',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordAuth: Story = {
  args: {},
}
