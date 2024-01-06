import { useState } from 'react'

import { EyeOutline } from '@/assets'
import { SearchOutline } from '@/assets/icons/search-outline'
import { Typography } from '@/components/ui/typography'

import s from './textField.module.scss'

export type TextFieldProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  variant?: 'password' | 'search' | 'text'
}

const TextField = (props: TextFieldProps) => {
  const { className, disabled = false, error = false, variant = 'text' } = props
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const searchVariant = variant === 'search'
  const passwordVariant = variant === 'password'
  const changePasswordVision = () => {
    setPasswordVisibility(!passwordVisibility)
  }
  const placeholderValidator = () => {
    if (searchVariant) {
      return 'Input search'
    } else if (error) {
      return 'Error'
    } else {
      return 'Input'
    }
  }

  return (
    <div className={s.textField_container}>
      {!searchVariant && (
        <Typography
          className={`${s.textField_label} ${disabled && s.textField_label_disabled}`}
          variant={'body2'}
        >
          Input
        </Typography>
      )}
      <div className={s[variant]}>
        <input
          className={`${s.textField}  ${error && s.textField_error}  ${className}`}
          disabled={disabled}
          name={'textField'}
          placeholder={placeholderValidator()}
          type={passwordVisibility ? 'text' : variant}
        />
        <div>
          {passwordVariant && (
            <EyeOutline
              className={`${s.passwordEyeIcon} ${disabled && s.passwordEyeIcon_disabled}`}
              onClick={changePasswordVision}
            />
          )}
        </div>
        <div>
          {searchVariant && (
            <SearchOutline
              className={`${s.searchIcon} ${error && s.searchIcon_error} ${
                disabled && s.searchIcon_disabled
              }`}
            />
          )}
        </div>
      </div>
      {error && (
        <Typography className={s.errorMessage} variant={'error'}>
          Error!
        </Typography>
      )}
    </div>
  )
}

export default TextField
