import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  icon?: ReactNode
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
  const classNames = {
    buttonStyles: clsx(
      s.button,
      s[variant],
      fullWidth && s.fullWidth,
      icon && s.withIcon,
      className
    ),
  }

  return (
    <div className={s.buttonWrapper}>
      <div className={s.iconWrapper}>{icon ?? icon}</div>
      <Component className={classNames.buttonStyles} {...rest} />
    </div>
  )
}
