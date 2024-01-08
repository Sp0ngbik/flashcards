import { RadioGroupDemo } from '@/components/ui/radio-group/radioGroup'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: RadioGroupDemo,
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroupDemo>

type Story = StoryObj<typeof meta>

export default meta

export const RadioDefault: Story = {}
