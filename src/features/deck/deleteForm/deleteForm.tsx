import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'
import { Typography } from '@/common/ui/typography'

import s from './deleteForm.module.scss'

type DeleteProps = {
  cancel: () => void
  deleteCB: (id: string) => void
  id: string
  isOpen: boolean
  name: string
  onOpenChange: (open: boolean) => void
}

const DeleteForm = ({ cancel, deleteCB, id, isOpen, name, onOpenChange }: DeleteProps) => {
  const onDeleteDeck = () => {
    deleteCB(id)
    onOpenChange(false)
  }

  return (
    <Modal onOpenChange={onOpenChange} open={isOpen} title={name}>
      <div className={s.form}>
        <div className={s.text}>
          <Typography>{`Do you really want to remove ${name} ?`}</Typography>
          <Typography>{`All cards will be deleted.`}</Typography>
        </div>
        <div className={s.buttons}>
          <Button onClick={cancel} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={onDeleteDeck} variant={'primary'}>
            Delete Pack
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteForm
