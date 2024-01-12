import React, { ElementRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'

type ItemProps = {
  className?: string
  value: string
}
export const SelectItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ value, ...props }, ref) => {
    return (
      <SelectRadix.Item {...props} value={value}>
        <SelectRadix.ItemText ref={ref}>{value}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
