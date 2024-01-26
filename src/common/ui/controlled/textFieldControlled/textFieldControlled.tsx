import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextFieldProps } from '@/common/ui/textField'
import TextField from '@/common/ui/textField/textField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'disabled' | 'rules'> &
  Omit<TextFieldProps, 'checked' | 'onChange'>
export const TextFieldControlled = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const { field } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <TextField {...rest} {...field} />
}
