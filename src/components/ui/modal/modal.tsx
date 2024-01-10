import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

type ModalProps = {
  children?: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, title, ...props }: ModalProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={s.overlay} />
        <DialogPrimitive.Content className={s.content}>
          {title && (
            <div className={s.header}>
              <DialogPrimitive.Title>
                <Typography variant={'h2'}>{title}</Typography>
              </DialogPrimitive.Title>
              <DialogPrimitive.Close aria-label={'Close'}>
                <Cross1Icon className={s.closeIcon} />
              </DialogPrimitive.Close>
            </div>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
