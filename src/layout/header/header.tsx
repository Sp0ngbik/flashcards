import { Logo } from '@/assets'
import { Button } from '@/common/ui/button'
import { DropdownMenu } from '@/common/ui/dropDownMenu'

import s from './header.module.scss'

type Props = {
  isLoggedIn: boolean
}

export const Header = ({ isLoggedIn }: Props) => {
  return (
    <div className={s.headerBackGround}>
      <div className={s.headerWrapper}>
        <Logo />
        <div className={s.headerRightSection}>
          {isLoggedIn ? (
            <div className={s.userBlock}>
              <span>Username</span>
              <DropdownMenu />
            </div>
          ) : (
            <Button>Sign In</Button>
          )}
        </div>
      </div>
    </div>
  )
}
