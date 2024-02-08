import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '@/layout/header/header'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    isAuth: {
      control: { type: 'radio' },
      options: [true, false],
    },
  },
  component: Header,
  decorators: [
    Story => (
      <BrowserRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof meta>

export default meta

export const LoggedHeader: Story = {
  args: {
    isAuth: true,
  },
}

export const LoggedOffHeader: Story = {
  args: {
    isAuth: false,
  },
}
