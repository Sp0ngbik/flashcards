import { SearchOutline } from '@/assets/icons/search-outline'
import { Typography } from '@/components/ui/typography'

import s from './textField.module.scss'

export type TextFieldProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  placeholder: string
  variant?: 'password' | 'search' | 'text'
}

const TextField = (props: TextFieldProps) => {
  const { className, disabled = false, error = false, placeholder, variant = 'search' } = props
  const searchVariant = variant === 'search'

  return (
    <div className={s.textField_container}>
      {!searchVariant && (
        <Typography
          className={`${s.textField_label} ${disabled && s.textField_label_disabled}`}
          variant={'body2'}
        >
          {placeholder}
        </Typography>
      )}
      <div className={s[variant]}>
        <input
          className={`${s.textField}  ${error && s.textField_error}  ${className}`}
          disabled={disabled}
          name={'textField'}
          placeholder={error ? 'Error' : placeholder}
          type={variant}
        />
        <div>{searchVariant && <SearchOutline className={s.searchIcon} />}</div>
      </div>
      {error && <Typography variant={'error'}>Error!</Typography>}
    </div>
  )
}

export default TextField
