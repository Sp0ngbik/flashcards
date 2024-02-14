import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'

import s from './imagePreview.module.scss'

export type ImagePreviewProps = {
  alt?: string
  onClose?: () => void
  open: boolean
  src: string
}
export const ImagePreview = ({ alt, onClose, open, src }: ImagePreviewProps) => {
  const handleModalClosed = () => {
    onClose?.()
  }

  return (
    <Dialog onOpenChange={handleModalClosed} open={open}>
      <DialogPortal>
        <DialogOverlay className={s.overlay} />
        <DialogContent asChild className={s.content}>
          <img
            alt={alt ?? 'preview'}
            className={s.imageBlock}
            onClick={handleModalClosed}
            src={src}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
