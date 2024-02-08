import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/services/store'

import CheckEmail from './checkEmail'

const meta = {
  args: {
    email: 'example@email.com', // Здесь передайте значение email
  },
  component: CheckEmail,
  decorators: [
    Story => (
      <div style={{ height: '340px' }}>
        <BrowserRouter>
          <Provider store={store}>
            <Story />
          </Provider>
        </BrowserRouter>
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailAuth: Story = {
  args: {
    email: 'example@email.com', // Здесь передайте значение email
  },
}
