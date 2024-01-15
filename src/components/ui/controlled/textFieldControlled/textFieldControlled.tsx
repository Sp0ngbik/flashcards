import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import TextField, { TextFieldProps } from '@/components/ui/textField/textField'

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
