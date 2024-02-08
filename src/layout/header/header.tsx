import { Outlet, useNavigate } from 'react-router-dom'

import { Logo } from '@/assets'
import { Button } from '@/common/ui/button'
import { DropdownMenu } from '@/common/ui/dropDownMenu'
import { Loader } from '@/common/ui/loader'
import { useMeQuery } from '@/services/auth/auth.service'

import s from './header.module.scss'

export type AuthContext = {
  isAuthenticated: boolean
}

interface HeaderProps {
  isAuth?: boolean
}

export const Header = ({ isAuth }: HeaderProps) => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError && !isLoading
  const navigate = useNavigate()
  const isShowHeaderInfo = !isError && data

  const logoRedirect = () => {
    return navigate('/')
  }

  const signInRedirect = () => {
    return navigate('/sign-in')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <header className={s.headerBackGround}>
        <div className={s.headerWrapper}>
          <div className={s.headerLogo} onClick={logoRedirect}>
            <Logo onClick={logoRedirect} />
          </div>
          <div className={s.headerRightSection}>
            {isAuth ?? isShowHeaderInfo ? (
              <div className={s.userBlock}>
                <span>{data?.name}</span>
                <DropdownMenu
                  className={s.dropDownTrigger}
                  userAvatar={data?.avatar}
                  userEmail={data?.email}
                  userName={data?.name}
                />
              </div>
            ) : (
              <Button onClick={signInRedirect}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet context={{ isAuthenticated: isAuth || isAuthenticated } as AuthContext} />
      </main>
    </div>
  )
}
