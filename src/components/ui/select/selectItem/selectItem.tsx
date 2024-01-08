import React from 'react'

import * as SelectRadix from '@radix-ui/react-select'

import s from '@/components/ui/select/select.module.scss'
type ItemProps = {
  className?: string
  value: string
}
export const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item className={s.selectItem} {...props} ref={forwardedRef}>
        <SelectRadix.ItemText>{props.value}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
