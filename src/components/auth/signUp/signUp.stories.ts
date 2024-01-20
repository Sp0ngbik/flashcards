import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'

import { SignUp } from './signUp'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Components/Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpDefault: Story = {}

export const SignUpProgress: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailElement = canvas.getByLabelText('Email')

    await userEvent.type(emailElement, 'user@gmail.com', {
      delay: 100,
    })

    const passwordElement = canvas.getByLabelText('Password')

    await userEvent.type(passwordElement, '123456789', {
      delay: 100,
    })

    const confirmPassword = canvas.getByLabelText('Confirm Password')

    await userEvent.type(confirmPassword, '123456789', {
      delay: 100,
    })

    const buttonElement = canvas.getByLabelText('Sign Up')

    await userEvent.click(buttonElement, {
      delay: 200,
    })
  },
}

export const SignUpError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailElement = canvas.getByLabelText('Email')

    await userEvent.type(emailElement, 'usermail.com', {
      delay: 100,
    })

    const passwordElement = canvas.getByLabelText('Password')

    await userEvent.type(passwordElement, '123' + '', {
      delay: 100,
    })

    const confirmPassword = canvas.getByLabelText('Confirm Password')

    await userEvent.type(confirmPassword, '123456789', {
      delay: 100,
    })

    const buttonElement = canvas.getByLabelText('Sign Up')

    await userEvent.click(buttonElement, {
      delay: 200,
    })
  },
}
