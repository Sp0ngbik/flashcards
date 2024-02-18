import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type DoubleSliderProps = ComponentPropsWithoutRef<typeof Slider.Root>

export const DoubleSlider = (props: DoubleSliderProps) => {
  const { defaultValue = [0, 5], disabled, max, onValueCommit, ...rest } = props
  const [sliderValue, setSliderValue] = useState(defaultValue)

  useEffect(() => {
    setSliderValue(defaultValue)
  }, [defaultValue])
  const onChangeValueHandler = (data: number[]) => {
    setSliderValue(data)
  }
  const handleChangeValidator = (newValue: number, side?: 'left' | 'right') => {
    const temp = [...defaultValue]
    const clampedValue = Math.min(newValue, max ? max : defaultValue[1])

    if (side === 'left') {
      temp[0] = clampedValue
    } else if (side === 'right') {
      temp[1] = clampedValue
    }

    if (temp[0] > temp[1]) {
      setSliderValue([temp[1], temp[0]])
    } else {
      setSliderValue(temp)
    }
  }

  const onBlurHandler = () => {
    onValueCommit?.(sliderValue)
  }

  return (
    <div className={s.container}>
      <input
        className={s.value}
        disabled={disabled}
        onBlur={onBlurHandler}
        onChange={e => handleChangeValidator(+e.currentTarget.value, 'left')}
        pattern={'[0-100]'}
        type={'number'}
        value={sliderValue[0]}
      />

      <Slider.Root
        className={s.slider}
        disabled={disabled}
        max={max}
        onValueChange={onChangeValueHandler}
        onValueCommit={onValueCommit}
        value={sliderValue}
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
        onBlur={onBlurHandler}
        onChange={e => handleChangeValidator(+e.currentTarget.value, 'right')}
        pattern={'[0-100]'}
        type={'number'}
        value={sliderValue[1]}
      />
    </div>
  )
}
