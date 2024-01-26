import CreateNewPassword from '@/pages/auth/createNewPassword/createNewPassword'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'

const meta = {
  component: CreateNewPassword,
  decorators: [
    Story => (
      <div style={{ height: '340px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordAuth: Story = {
  args: {},
}

export const CreatePassword: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const passwordElement = canvas.getByPlaceholderText('Your password')

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
export const CreatePasswordWithError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const passwordElement = canvas.getByPlaceholderText('Your password')

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
