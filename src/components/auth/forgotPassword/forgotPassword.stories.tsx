import type { Meta, StoryObj } from '@storybook/react'

import { userEvent, within } from '@storybook/test'

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
export const ForgotPasswordInteractive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailElement = canvas.getByPlaceholderText('Email')

    // The delay option sets the amount of milliseconds between characters being typed
    await userEvent.type(emailElement, 'randomstring@mail.ru', {
      delay: 100,
    })
    const buttonElement = canvas.getByText('Send Instructions')

    await userEvent.click(buttonElement, {
      delay: 200,
    })
  },
}
export const ForgotPasswordWithErrorInteractive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailElement = canvas.getByPlaceholderText('Email')

    // The delay option sets the amount of milliseconds between characters being typed
    await userEvent.type(emailElement, 'randomstring', {
      delay: 100,
    })
    const buttonElement = canvas.getByText('Send Instructions')

    await userEvent.click(buttonElement, {
      delay: 200,
    })
  },
}
