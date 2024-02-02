import React, { ComponentPropsWithoutRef, ElementRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from '../select.module.scss'

type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>
export const SelectTextItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SelectRadix.Item {...props} className={s.selectItem}>
        <SelectRadix.ItemText ref={ref}>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)

export const SelectItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = {
      selectItem: clsx(s.selectItem, className),
    }

    return (
      <SelectRadix.Item {...props} className={classNames.selectItem} ref={ref}>
        {children}
      </SelectRadix.Item>
    )
  }
)
