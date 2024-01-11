import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  className?: string
  defaultChecked?: boolean
  disabled?: boolean
  options: string[]
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, Props>(
  (props, ref) => {
    const { options } = props

    return (
      <form>
        <RadioGroupRadix.Root className={s.radioGroupRoot} {...props} defaultValue={options[0]}>
          {props.options.map((el, index) => (
            <div className={s.radioButtonBlock} key={index} ref={ref}>
              <RadioGroupRadix.Item className={s.radioGroupItem} id={'r' + index} value={el}>
                <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
              </RadioGroupRadix.Item>
              <Typography as={'label'} className={s.label} htmlFor={el} variant={'body2'}>
                {el}
              </Typography>
            </div>
          ))}
        </RadioGroupRadix.Root>
      </form>
    )
  }
)
