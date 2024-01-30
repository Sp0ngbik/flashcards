import { Outlet } from 'react-router-dom'

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

  return (
    <div>
      <header className={s.headerBackGround}>
        <main className={s.headerWrapper}>
          <Logo />
          <div className={s.headerRightSection}>
            {data ? (
              <div className={s.userBlock}>
                <span>{data.name}</span>
                <DropdownMenu logout={logout} userEmail={data.email} userName={data.name} />
              </div>
            ) : (
              <Button>Sign In</Button>
            )}
          </div>
        </main>
      </header>
      <Outlet context={{ isAuthenticated } satisfies AuthContext} />
    </div>
  )
}
