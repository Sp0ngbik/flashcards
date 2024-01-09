import { useRef } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radioGroup'

const meta = {
  argTypes: {
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
  },
  component: RadioGroup,
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

export default meta

const radioGroupOptions = ['Check1', 'Check2', 'Check3', 'Check4']

export const RadioDefault: Story = {
  args: {
    options: radioGroupOptions,
  },
}

export const RadioDisabled: Story = {
  args: {
    disabled: true,
    options: radioGroupOptions,
  },
}
