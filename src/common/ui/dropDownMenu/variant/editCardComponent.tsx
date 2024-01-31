import { Delete } from '@/assets/icons/delete'
import { Edit } from '@/assets/icons/edit'
import { Play } from '@/assets/icons/play'
import { Typography } from '@/common/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '../dropDownMenu.module.scss'

type EditCardComponentProps = { deleteDeck?: () => void; edit?: () => void; learn?: () => void }

export const EditCardComponent = ({ deleteDeck }: EditCardComponentProps) => {
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
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onSelect={deleteDeck}>
        <Delete />
        <Typography variant={'caption'}>Delete</Typography>
      </DropdownMenuRadix.Item>
    </>
  )
}
