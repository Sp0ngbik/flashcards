import { Delete } from '@/assets/icons/delete'
import { Edit } from '@/assets/icons/edit'
import { Play } from '@/assets/icons/play'
import { Typography } from '@/common/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '../dropDownMenu.module.scss'

type EditCardComponentProps = {
  deleteDeck?: () => void
  edit?: () => void
  learn?: () => void
  onEditClick: () => void
}

export const EditCardComponent = ({ deleteDeck, learn, onEditClick }: EditCardComponentProps) => {
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
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onSelect={deleteDeck}>
        <Delete />
        <Typography variant={'caption'}>Delete</Typography>
      </DropdownMenuRadix.Item>
    </>
  )
}
