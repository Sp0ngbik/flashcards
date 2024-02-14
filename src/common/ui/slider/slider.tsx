import { ComponentPropsWithoutRef } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type DoubleSliderProps = {
  changeSliderValue: (value: number[]) => void
} & ComponentPropsWithoutRef<typeof Slider.Root>

export const DoubleSlider = (props: DoubleSliderProps) => {
  const { changeSliderValue, defaultValue = [0, 5], disabled, max, ...rest } = props

  const onValueChange = (data: number[]) => {
    changeSliderValue(data)
  }

  const onChangeInput = (value: number, side: 'left' | 'right') => {
    const temp = [...defaultValue]
    const clampedValue = Math.min(value, max ? max : defaultValue[1])

    if (side === 'left') {
      temp[0] = clampedValue
    } else {
      temp[1] = clampedValue
    }
    changeSliderValue(temp)
  }

  const onBlurValidate = () => {
    const temp = [...defaultValue]

    if (temp[0] > temp[1]) {
      changeSliderValue([temp[1], temp[0]])
    }
  }

  return (
    <div className={s.container}>
      <input
        className={s.value}
        disabled={disabled}
        onBlur={onBlurValidate}
        onChange={e => onChangeInput(+e.currentTarget.value, 'left')}
        pattern={'[0-100]'}
        type={'number'}
        value={defaultValue[0]}
      />

      <Slider.Root
        className={s.slider}
        defaultValue={defaultValue}
        disabled={disabled}
        max={max}
        onValueChange={onValueChange}
        value={defaultValue}
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
        disabled={disabled}
        onChange={e => onChangeInput(+e.currentTarget.value, 'right')}
        pattern={'[0-100]'}
        type={'number'}
        value={defaultValue[1]}
      />
    </div>
  )
}
