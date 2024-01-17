import { forwardRef } from 'react'

import { Check } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

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

  return (
    <div className={`${s.Container} ${className}`} {...rest}>
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
          className={`${s.Typography} ${disabled ? s.Disabled : ''}`}
          htmlFor={'c1'}
          variant={'body2'}
        >
          {text}
        </Typography>
      )}
    </div>
  )
})
