import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radioGroup.module.scss'

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, RadioGroupProps>(
  (props, ref) => {
    const classNames = {
      radioButtonContainer: clsx(s.radioButtonBlock, s.formGroup),
    }

    return (
      <RadioGroupRadix.Root className={s.radioGroupRoot} {...props}>
        <div className={classNames.radioButtonContainer} ref={ref}>
          {props.children}
        </div>
      </RadioGroupRadix.Root>
    )
  }
)
