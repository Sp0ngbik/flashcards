import { forwardRef } from 'react'

import { Check } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  onValueChange?: (value: boolean) => void
  text?: string
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const { checked = true, className, disabled = false, onValueChange, text, ...rest } = props

  const classNames = {
    checkBoxContainer: clsx(s.Container, className),
    checkBoxLabel: clsx(s.Typography, disabled && s.Disabled),
  }

  return (
    <div className={classNames.checkBoxContainer} {...rest}>
      <CheckboxRadix.Root
        checked={checked}
        className={s.CheckboxRoot}
        disabled={disabled}
        id={'c1'}
        onCheckedChange={onValueChange}
      >
        <CheckboxRadix.Indicator className={s.CheckboxIndicator} ref={ref}>
          <Check />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {text && (
        <Typography
          as={'label'}
          className={classNames.checkBoxLabel}
          htmlFor={'c1'}
          variant={'body2'}
        >
          {text}
        </Typography>
      )}
    </div>
  )
})
