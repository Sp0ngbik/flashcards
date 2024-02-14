import { RadioItem } from '@/common/ui/radioGroup/radioItem'
import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radioGroup'

const meta = {
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

export default meta

export const RadioPrimary: Story = (args: { disabled: boolean }) => (
  <RadioGroup {...args}>
    <RadioItem value={'1'}>1</RadioItem>
    <RadioItem value={'2'}>2</RadioItem>
    <RadioItem value={'3'}>3</RadioItem>
    <RadioItem value={'4'}>4</RadioItem>
  </RadioGroup>
)

RadioPrimary.args = {
  disabled: false,
}

export const RadioDisabled: Story = {
  args: {},
  render: () => (
    <RadioGroup defaultValue={'1'} disabled>
      <RadioItem value={'1'}>1</RadioItem>
      <RadioItem value={'2'}>2</RadioItem>
      <RadioItem value={'3'}>3</RadioItem>
      <RadioItem value={'4'}>4</RadioItem>
    </RadioGroup>
  ),
}
