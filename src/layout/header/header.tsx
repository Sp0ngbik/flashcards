import { Outlet, useNavigate } from 'react-router-dom'

import { Logo } from '@/assets'
import { Button } from '@/common/ui/button'
import { DropdownMenu } from '@/common/ui/dropDownMenu'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.sevice'

import s from './header.module.scss'

export type AuthContext = {
  isAuthenticated: boolean
}

export const Header = () => {
  const { data, isError, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()
  const isAuthenticated = !isError && !isLoading
  const navigate = useNavigate()

  const logoRedirect = () => {
    return navigate('/')
  }

  const signInRedirect = () => {
    return navigate('/sign-in')
  }

  return (
    <div>
      <header className={s.headerBackGround}>
        <div className={s.headerWrapper}>
          <div className={s.headerLogo} onClick={logoRedirect}>
            <Logo onClick={logoRedirect} />
          </div>
          <div className={s.headerRightSection}>
            {!isError && data ? (
              <div className={s.userBlock}>
                <span>{data?.name}</span>
                <DropdownMenu
                  logout={logout}
                  userAvatar={data.avatar}
                  userEmail={data.email}
                  userName={data.name}
                />
              </div>
            ) : (
              <Button onClick={signInRedirect}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet context={{ isAuthenticated } satisfies AuthContext} />
      </main>
    </div>
  )
}
