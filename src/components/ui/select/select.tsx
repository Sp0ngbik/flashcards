import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { ArrowDown, ArrowUp } from '@/assets'
import { SelectItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = {
  className?: string
  classNameItem?: string
  defaultOpen?: boolean
  disabled?: boolean
  label?: string
  options: string[]
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = forwardRef<ElementRef<typeof SelectRadix.Root>, Props>(
  ({ className, classNameItem, disabled = false, label, options = [], ...props }, refSelect) => {
    const [state, setState] = useState(false)

    return (
      <div className={s.selectWrapper}>
        <Typography
          className={`${s.selectLabel} ${disabled && s.selectLabelDisabled}`}
          variant={'body2'}
        >
          {label}
        </Typography>
        <SelectRadix.Root
          defaultValue={options[0]}
          disabled={disabled}
          onOpenChange={open => setState(open)}
          {...props}
        >
          <SelectRadix.Trigger className={`${s.selectTrigger} ${className}`}>
            <SelectRadix.Value placeholder={options[0]} />
            <SelectRadix.Icon asChild>
              {state ? <ArrowUp className={s.arrow} /> : <ArrowDown className={s.arrow} />}
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
                <SelectRadix.Group className={s.selectGroup}>
                  {options.map((el, index) => (
                    <SelectItem
                      className={`${s.selectItem} ${classNameItem}`}
                      key={index}
                      value={el}
                    />
                  ))}
                </SelectRadix.Group>
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </div>
    )
  }
)
