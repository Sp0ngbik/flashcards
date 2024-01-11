import React, { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { EyeOffOutline, EyeOutline, SearchOutline } from '@/assets'
import { Typography } from '@/components/ui/typography'

import s from './textField.module.scss'

export type TextFieldProps<T extends ElementType = 'input'> = {
  className?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  variant?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<T>

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, forwardRef) => {
  const {
    className,
    disabled = false,
    error = false,
    errorMessage = 'Error!',
    label = 'Input',
    variant = 'text',
    ...rest
  } = props
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const searchVariant = variant === 'search'
  const passwordVariant = variant === 'password'
  const changePasswordVision = () => {
    setPasswordVisibility(!passwordVisibility)
  }
  const placeholderValidator = () => {
    if (searchVariant) {
      return errorMessage || 'Input search'
    } else if (error) {
      return errorMessage || 'Error'
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
          {label}
        </Typography>
      )}
      <div className={s[variant]}>
        <input
          className={`${s.textField}  ${error && s.textField_error}  ${className}`}
          disabled={disabled}
          name={'textField'}
          placeholder={placeholderValidator()}
          ref={forwardRef}
          type={passwordVisibility ? 'text' : variant}
          {...rest}
        />
        <div>
          {passwordVariant && (
            <div>
              {passwordVisibility ? (
                <EyeOffOutline
                  className={`${s.passwordEyeIcon} ${disabled && s.passwordEyeIcon_disabled}`}
                  onClick={changePasswordVision}
                />
              ) : (
                <EyeOutline
                  className={`${s.passwordEyeIcon} ${disabled && s.passwordEyeIcon_disabled}`}
                  onClick={changePasswordVision}
                />
              )}
            </div>
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
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})

export default TextField
