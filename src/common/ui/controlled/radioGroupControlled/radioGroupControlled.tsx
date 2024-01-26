import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/common/ui/radio-group'

type RadioControlledProps<T extends FieldValues> = Omit<
  RadioGroupProps,
  'onValueChange' | 'value'
> &
  UseControllerProps<T>

export const RadioGroupControlled = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: RadioControlledProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name, shouldUnregister })

  return <RadioGroup name={'name'} onValueChange={onChange} value={value} {...rest} />
}
