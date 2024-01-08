import { Check } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  text?: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked = true, className, disabled = false, text, ...rest } = props

  return (
    <div className={`${s.Container} ${className}`} {...rest}>
      <CheckboxRadix.Root
        checked={checked}
        className={s.CheckboxRoot}
        disabled={disabled}
        id={'c1'}
      >
        <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
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
}
