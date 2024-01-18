import { ComponentPropsWithoutRef, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type DoubleSliderProps = ComponentPropsWithoutRef<typeof Slider.Root>

export const DoubleSlider = (props: DoubleSliderProps) => {
  const { defaultValue = [1, 15], ...rest } = props

  const [currentValue, setCurrentValue] = useState(defaultValue)

  const onValueChange = (data: number[]) => {
    setCurrentValue(data)
  }

  const onChangeInput = (value: number, side: 'left' | 'right') => {
    const temp = [...currentValue]
    const clampedValue = Math.min(value, 100)

    if (side === 'left') {
      temp[0] = clampedValue
    } else {
      temp[1] = clampedValue
    }
    setCurrentValue(temp)
  }

  return (
    <div className={s.container}>
      <input
        className={s.value}
        onChange={e => onChangeInput(+e.currentTarget.value, 'left')}
        type={'number'}
        value={currentValue[0]}
      />

      <Slider.Root
        className={s.slider}
        defaultValue={currentValue}
        onValueChange={onValueChange}
        value={currentValue}
        {...rest}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb aria-label={'Volume'} className={s.sliderThumb} />
        <Slider.Thumb aria-label={'Volume'} className={s.sliderThumb} />
      </Slider.Root>

      <input
        className={s.value}
        onChange={e => onChangeInput(+e.currentTarget.value, 'right')}
        type={'number'}
        value={currentValue[1]}
      />
    </div>
  )
}
