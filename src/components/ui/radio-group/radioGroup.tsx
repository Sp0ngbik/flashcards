import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  className?: string
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, Props>(
  (props, ref) => {
    return (
      <form className={s.formGroup}>
        <RadioGroupRadix.Root className={s.radioGroupRoot} {...props}>
          <div className={s.radioButtonBlock} ref={ref}>
            {props.children}
          </div>
        </RadioGroupRadix.Root>
      </form>
    )
  }
)
