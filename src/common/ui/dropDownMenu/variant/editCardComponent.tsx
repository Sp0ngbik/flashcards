import { Delete } from '@/assets/icons/delete'
import { Edit } from '@/assets/icons/edit'
import { Play } from '@/assets/icons/play'
import { Typography } from '@/common/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '../dropDownMenu.module.scss'

type EditCardComponentProps = {
  edit?: () => void
  learn?: () => void
  onEditClick: () => void
  onOpenDeleteForm?: (open: boolean) => void
}

export const EditCardComponent = ({
  learn,
  onEditClick,
  onOpenDeleteForm,
}: EditCardComponentProps) => {
  const openDeleteForm = () => {
    if (onOpenDeleteForm) {
      onOpenDeleteForm(true)
    }
  }

  return (
    <>
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onSelect={learn}>
        <Play />
        <Typography variant={'caption'}>Learn</Typography>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onSelect={onEditClick}>
        <Edit />
        <Typography variant={'caption'}>Edit</Typography>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onSelect={openDeleteForm}>
        <Delete />
        <Typography variant={'caption'}>Delete</Typography>
      </DropdownMenuRadix.Item>
    </>
  )
}
