import CreateNewPassword from '@/components/auth/createNewPassword/createNewPassword'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'

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

export const CreatePasswordStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const passwordElement = canvas.getByPlaceholderText('Password')

    // The delay option sets the amount of milliseconds between characters being typed
    await userEvent.type(passwordElement, 'randomstring', {
      delay: 100,
    })
    const buttonElement = canvas.getByText('Create New Password')

    await userEvent.click(buttonElement, {
      delay: 200,
    })
  },
}
export const CreatePasswordWirhErrorStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const passwordElement = canvas.getByPlaceholderText('Password')

    // The delay option sets the amount of milliseconds between characters being typed
    await userEvent.type(passwordElement, 'ra', {
      delay: 100,
    })
    const buttonElement = canvas.getByText('Create New Password')

    await userEvent.click(buttonElement, {
      delay: 200,
    })
  },
}
