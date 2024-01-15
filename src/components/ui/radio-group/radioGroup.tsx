import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, RadioGroupProps>(
  (props, ref) => {
    return (
      <RadioGroupRadix.Root className={s.radioGroupRoot} {...props}>
        <div className={`${s.radioButtonBlock} ${s.formGroup}`} ref={ref}>
          {props.children}
        </div>
      </RadioGroupRadix.Root>
    )
  }
)
