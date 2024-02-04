import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type Props = {
  children: ReactNode
  className?: string
  classNameWrapper?: string
}

export const Card = ({ children, className, classNameWrapper }: Props) => {
  const classNames = {
    cardItems: clsx(s.cardItems, className),
    cardWrapper: clsx(s.card, classNameWrapper),
  }

  return (
    <div className={classNames.cardWrapper}>
      <div className={classNames.cardItems}>{children}</div>
    </div>
  )
}
