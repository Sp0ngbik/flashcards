import { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import { Check } from '@/assets'
import { Typography } from '@/common/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  className?: string
  onValueChange?: (value: boolean) => void
  text?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const { className, disabled = false, id, text, ...rest } = props

  const classNames = {
    checkBoxContainer: clsx(s.Container, className),
    checkBoxLabel: clsx(s.Typography, disabled && s.Disabled),
  }
  const generatedId = useId()

  return (
    <div className={classNames.checkBoxContainer}>
      <CheckboxRadix.Root className={s.CheckboxRoot} id={id ?? generatedId} {...rest}>
        <CheckboxRadix.Indicator className={s.CheckboxIndicator} ref={ref}>
          <Check />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {text && (
        <Typography
          as={'label'}
          className={classNames.checkBoxLabel}
          htmlFor={id ?? generatedId}
          variant={'body2'}
        >
          {text}
        </Typography>
      )}
    </div>
  )
})
