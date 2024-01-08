import React from 'react'

import * as SelectRadix from '@radix-ui/react-select'

type ItemProps = {
  className?: string
  value: string
}
export const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item {...props} ref={forwardedRef}>
        <SelectRadix.ItemText>{props.value}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
