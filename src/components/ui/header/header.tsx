import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'

import s from './header.module.scss'

import defaultImage from '../../../assets/image/defaultAvatar.png'

type Props = {
  isLoggedIn: boolean
}

export const Header = ({ isLoggedIn }: Props) => {
  return (
    <div className={s.headerWrapper}>
      <Logo />
      <div className={s.headerRightSection}>
        {isLoggedIn ? (
          <div className={s.userBlock}>
            <span>Username</span>
            <img alt={'user avatar not found'} src={defaultImage} />
          </div>
        ) : (
          <Button>Sign In</Button>
        )}
      </div>
    </div>
  )
}
