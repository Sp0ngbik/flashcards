import type { Meta, StoryObj } from '@storybook/react'

import { Grade } from '@/common/ui/grade/grade'

const meta = {
  argTypes: {},
  component: Grade,
  title: 'Components/Grade',
} satisfies Meta<typeof Grade>

export default meta
type Story = StoryObj<typeof meta>
export const GradeStory: Story = {
  args: { count: 3 },
  render() {
    return <Grade count={3} />
  },
}
