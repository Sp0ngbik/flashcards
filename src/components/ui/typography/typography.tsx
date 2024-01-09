import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'label'> = {
  as?: T
  className?: string
  variant:
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

export const Typography = <T extends ElementType = 'label'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { as: Component = 'label', className, variant = 'body1', ...rest } = props

  return <Component className={`${s.typography} ${s[variant]} ${className}`} {...rest} />
}
