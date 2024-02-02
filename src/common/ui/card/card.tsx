import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type Props = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: Props) => {
  const classNames = {
    cardItems: clsx(s.cardItems, className),
  }

  return (
    <div className={s.card}>
      <div className={classNames.cardItems}>{children}</div>
    </div>
  )
}
