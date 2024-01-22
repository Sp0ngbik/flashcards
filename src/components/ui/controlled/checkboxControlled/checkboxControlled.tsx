import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

type CheckboxControlledProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>

export const CheckboxControlled = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: CheckboxControlledProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name, shouldUnregister })

  return <Checkbox checked={value} onCheckedChange={onChange} {...rest} />
}
