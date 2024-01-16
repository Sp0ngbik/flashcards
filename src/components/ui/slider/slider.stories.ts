import type { Meta, StoryObj } from '@storybook/react'

import { DoubleSlider } from './slider'

const meta = {
  argTypes: {},
  component: DoubleSlider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof DoubleSlider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderOwn: Story = {
  args: {
    defaultValue: [1, 39],
    max: 61,
    min: 1,
    minStepsBetweenThumbs: 1,
  },
}
