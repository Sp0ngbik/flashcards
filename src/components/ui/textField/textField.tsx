import React, { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { EyeOffOutline, EyeOutline, SearchOutline } from '@/assets'
import { Typography } from '@/components/ui/typography'

import s from './textField.module.scss'

export type TextFieldProps<T extends ElementType = 'input'> = {
  errorMessage?: string
  label?: string
  variant?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<T>

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, forwardRef) => {
  const {
    className,
    disabled = false,
    errorMessage = '',
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

  return (
    <div className={`${s.textField_container} ${className}`}>
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
          className={`${s.textField}  ${errorMessage && s.textField_error}  `}
          disabled={disabled}
          name={'textFieldControlled'}
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
              className={`${s.searchIcon} ${errorMessage && s.searchIcon_error} ${
                disabled && s.searchIcon_disabled
              }`}
            />
          )}
        </div>
      </div>
      {errorMessage && (
        <Typography className={s.errorMessage} variant={'error'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})

export default TextField
