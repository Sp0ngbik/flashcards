import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/card/card'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>
export const CardOne: Story = {
  args: {},
}
