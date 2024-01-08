import { Delete } from '@/assets/icons/delete'
import { Edit } from '@/assets/icons/edit'
import { Play } from '@/assets/icons/play'
import { Typography } from '@/components/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '@/components/ui/dropDownMenu/dropDownMenu.module.scss'

export const EditCardComponent = () => {
  return (
    <>
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <Play />
        <Typography variant={'caption'}>Learn</Typography>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <Edit />
        <Typography variant={'caption'}>Edit</Typography>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <Delete />
        <Typography variant={'caption'}>Delete</Typography>
      </DropdownMenuRadix.Item>
    </>
  )
}
