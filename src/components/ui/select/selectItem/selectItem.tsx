import React, { ElementRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'

type ItemProps = {
  className?: string
  value: string
}
export const SelectItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ value, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item {...props} ref={forwardedRef} value={value}>
        <SelectRadix.ItemText>{value}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
