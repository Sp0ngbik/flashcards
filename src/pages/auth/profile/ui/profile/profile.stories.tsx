import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, Story } from '@storybook/react'

import { Profile, ProfileProps } from './profile'

export default {
  component: Profile,
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
  title: 'Components/Auth/Profile',
} as Meta

const Template: Story<ProfileProps> = args => <Profile {...args} />

export const Default = Template.bind({})
Default.args = {
  editStatus: false,
  //todo:
  // email: 'useremail@mail.com',
  // nickname: 'profile_nickname',
}

export const EditMode = Template.bind({})
EditMode.args = {
  ...Default.args,
  editStatus: true,
}
