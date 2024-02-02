import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/common/ui/card/card'
import TextField from '@/common/ui/textField/textField'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>
export const CardOne: Story = {
  args: { children: <TextField /> },
  render() {
    return <TextField />
  },
}
