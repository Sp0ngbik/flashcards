import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropDownMenu'

import s from './header.module.scss'

type Props = {
  isLoggedIn: boolean
}

export const Header = ({ isLoggedIn }: Props) => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.contentWrapper}>
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
