import { Meta, Story } from '@storybook/react'

import { Profile, ProfileProps } from './profile'

export default {
  component: Profile,
  decorators: [
    Story => (
      <div style={{ height: '340px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Components/Auth/Profile',
} as Meta

const Template: Story<ProfileProps> = args => <Profile {...args} />

export const Default = Template.bind({})
Default.args = {
  edit: false,
  email: 'useremail@mail.com',
  nickname: 'profile_nickname',
}

export const EditMode = Template.bind({})
EditMode.args = {
  ...Default.args,
  edit: true,
}
