import { useState } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'
export type DoubleSliderProps = {
  defaultValue: number[]
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  step?: number
  value?: number[]
}
export const DoubleSlider = (props: DoubleSliderProps) => {
  const { defaultValue, max, min, minStepsBetweenThumbs, step, value } = props
  const [currentValue, setCurrentValue] = useState(defaultValue)

  return (
    <div className={s.container}>
      <Typography as={'span'} className={s.value} variant={'body1'}>
        {currentValue[0]}
      </Typography>
      <Slider.Root
        className={s.slider}
        defaultValue={defaultValue}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={setCurrentValue}
        step={step}
        value={value}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb aria-label={'Volume'} className={s.sliderThumb} />
        <Slider.Thumb aria-label={'Volume'} className={s.sliderThumb} />
      </Slider.Root>
      <Typography as={'span'} className={s.value} variant={'body1'}>
        {currentValue[1]}
      </Typography>
    </div>
  )
}
