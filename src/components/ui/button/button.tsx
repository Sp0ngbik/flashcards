import { ComponentPropsWithoutRef, ElementType } from 'react'

import { LogOut } from '@/assets'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  icon?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    as: Component = 'button',
    className,
    fullWidth,
    icon,
    variant = 'primary',
    ...rest
  } = props

  return (
    <div className={s.buttonWrapper}>
      {icon && <LogOut className={s.logout} />}
      <Component
        className={`${s.button} ${s[variant]} ${fullWidth && s.fullWidth}
        ${icon && s.wihIcon} ${className}`}
        {...rest}
      />
    </div>
  )
}
