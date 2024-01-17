import React, { ComponentPropsWithoutRef, ElementRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'

import s from '../select.module.scss'

type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>
export const SelectItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, value, ...props }, ref) => {
    return (
      <SelectRadix.Item {...props} className={`${s.selectItem}`} value={value}>
        <SelectRadix.ItemText ref={ref}>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
