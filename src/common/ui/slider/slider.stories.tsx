import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

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
    max: 100,
    min: 1,
    minStepsBetweenThumbs: 1,
  },
  render: args => {
    const [sliderValue, setSliderValue] = useState(args.defaultValue)

    return (
      <>
        <DoubleSlider {...args} changeSliderValue={setSliderValue} defaultValue={sliderValue} />
        <span>Value: {JSON.stringify(sliderValue)}</span>
      </>
    )
  },
}
