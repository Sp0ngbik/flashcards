import { ReactNode } from 'react'

import s from './card.module.scss'

type Props = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: Props) => {
  return (
    <div className={s.card}>
      <div className={className}>{children}</div>
    </div>
  )
}
