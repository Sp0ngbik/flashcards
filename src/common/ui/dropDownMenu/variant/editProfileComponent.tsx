import { SignOut } from '@/assets/icons/sign-out'
import { User } from '@/assets/icons/user'
import { Typography } from '@/common/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '../dropDownMenu.module.scss'

type PropsType = {
  userAvatar: string
  userEmail: string
  userName: string
}
export const EditProfileComponent = (props: PropsType) => {
  return (
    <>
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <img alt={'user avatar'} className={s.UserAvatar} src={props.userAvatar} />
        <div>
          <Typography variant={'subtitle2'}>{props.userName}</Typography>
          <Typography className={s.userEmail} variant={'caption'}>
            {props.userEmail}
          </Typography>
        </div>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <User />
        <Typography variant={'caption'}>My Profile</Typography>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <SignOut />
        <Typography variant={'caption'}>Sign Out</Typography>
      </DropdownMenuRadix.Item>
    </>
  )
}
