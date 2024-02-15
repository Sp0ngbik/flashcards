import React, { ChangeEvent, ComponentPropsWithoutRef, ElementType, useId, useState } from 'react'

import { EyeOffOutline, EyeOutline, SearchOutline } from '@/assets'
import { Cross } from '@/assets/icons/cross'
import { Typography } from '@/common/ui/typography'
import { clsx } from 'clsx'

import s from './textField.module.scss'

export type TextFieldProps<T extends ElementType = 'input'> = {
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
  variant?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<T>

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, forwardRef) => {
  const {
    className,
    disabled = false,
    errorMessage = '',
    id,
    label,
    onValueChange,
    variant = 'text',
    ...rest
  } = props
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange && onValueChange(e.currentTarget.value)
  }
  const clearValue = () => {
    onValueChange && onValueChange('')
  }
  const searchVariant = variant === 'search'
  const passwordVariant = variant === 'password'
  const changePasswordVision = () => {
    setPasswordVisibility(!passwordVisibility)
  }
  const classNames = {
    inputField: clsx(s.textField, errorMessage && s.textField_error),
    passwordVisibility: clsx(s.passwordEyeIcon, disabled && s.passwordEyeIcon_disabled),
    searchIcon: clsx(
      s.searchIcon,
      errorMessage && s.searchIcon_error,
      disabled && s.searchIcon_disabled
    ),
    textFieldContainer: clsx(s.textField_container, className),
    textFieldLabel: clsx(s.textField_label, disabled && s.textField_label_disabled),
  }
  const generatedId = useId()

  return (
    <div className={classNames.textFieldContainer}>
      {!searchVariant && (
        <Typography
          as={'label'}
          className={classNames.textFieldLabel}
          htmlFor={id ?? generatedId}
          variant={'body2'}
        >
          {label}
        </Typography>
      )}
      <div className={s[variant]}>
        <input
          className={classNames.inputField}
          disabled={disabled}
          id={id ?? generatedId}
          name={'textFieldControlled'}
          onChange={onChangeValue}
          ref={forwardRef}
          type={passwordVisibility ? 'text' : variant}
          {...rest}
        />
        <div>{searchVariant && <Cross className={s.cross} onClick={clearValue} />}</div>
        <div>
          {passwordVariant && (
            <div>
              {passwordVisibility ? (
                <EyeOffOutline
                  className={classNames.passwordVisibility}
                  onClick={changePasswordVision}
                />
              ) : (
                <EyeOutline
                  className={classNames.passwordVisibility}
                  onClick={changePasswordVision}
                />
              )}
            </div>
          )}
        </div>
        <div>{searchVariant && <SearchOutline className={classNames.searchIcon} />}</div>
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
