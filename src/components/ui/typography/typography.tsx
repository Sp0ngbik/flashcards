import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'div'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { as: Component = 'div', className, variant = 'body1', ...rest } = props
  const classNames = {
    typographyStyle: clsx(s.typography, s[variant], className),
  }

  return <Component className={classNames.typographyStyle} {...rest} />
}
