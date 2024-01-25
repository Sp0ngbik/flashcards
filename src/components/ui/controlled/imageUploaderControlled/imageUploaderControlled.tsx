import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

type InputControlledProps<T extends FieldValues> = UseControllerProps<T>

export const ImageUploaderControlled = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: InputControlledProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name, shouldUnregister })

  return <input onChange={onChange} type={'file'} value={value} {...rest} />
}
