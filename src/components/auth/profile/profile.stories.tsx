import { Profile, ProfileProps } from '@/components/auth/profile/profile'
import { Meta, Story } from '@storybook/react'

export default {
  component: Profile,
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
