import { useNavigate } from 'react-router-dom'

import { SignOut } from '@/assets/icons/sign-out'
import { User } from '@/assets/icons/user'
import { Typography } from '@/common/ui/typography'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from '../dropDownMenu.module.scss'

type PropsType = {
  logout: () => void
  userAvatar: string
  userEmail: string
  userName: string
}
export const EditProfileComponent = (props: PropsType) => {
  const navigate = useNavigate()

  const profileNavigate = () => {
    navigate('/profile')
  }

  const { logout, userAvatar, userEmail, userName } = props

  return (
    <>
      <DropdownMenuRadix.Item className={s.DropdownMenuItem}>
        <img alt={'user avatar'} className={s.UserAvatar} src={userAvatar} />
        <div>
          <Typography variant={'subtitle2'}>{userName}</Typography>
          <Typography className={s.userEmail} variant={'caption'}>
            {userEmail}
          </Typography>
        </div>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onClick={profileNavigate}>
        <User />
        <Typography variant={'caption'}>My Profile</Typography>
      </DropdownMenuRadix.Item>
      <DropdownMenuRadix.Separator className={s.DropdownMenuSeparator} />
      <DropdownMenuRadix.Item className={s.DropdownMenuItem} onClick={logout}>
        <SignOut />
        <Typography variant={'caption'}>Sign Out</Typography>
      </DropdownMenuRadix.Item>
    </>
  )
}
