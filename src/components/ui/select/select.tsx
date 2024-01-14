import { ComponentPropsWithoutRef } from 'react'

import { ArrowDown } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = {
  className?: string
  label?: string
  placeholder?: string
  variant?: 'pagination' | 'primary'
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>
export const Select = ({
  children,
  className,
  disabled = false,
  label,
  placeholder,
  variant = 'primary',
  ...props
}: Props) => {
  return (
    <div className={s.selectWrapper}>
      <Typography
        className={`${s.selectLabel} ${disabled && s.selectLabelDisabled}`}
        variant={'body2'}
      >
        {label}
      </Typography>
      <SelectRadix.Root disabled={disabled} {...props}>
        <SelectRadix.Trigger
          className={`${s.selectTrigger} ${
            variant === 'pagination' && s.paginationSelect
          } ${className}`}
        >
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon asChild>
            <ArrowDown className={s.arrow} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            align={'start'}
            className={s.selectContent}
            position={'popper'}
            side={'bottom'}
          >
            <SelectRadix.Viewport>
              <SelectRadix.Group
                className={`${s.selectGroup} ${variant === 'pagination' && s.paginationSelectItem}`}
              >
                {children}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
