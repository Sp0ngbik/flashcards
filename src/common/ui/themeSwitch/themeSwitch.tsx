import { ComponentPropsWithoutRef } from 'react'

import * as Switch from '@radix-ui/react-switch'

import s from './themeSwitch.module.scss'

type ThemeSwitchProps = ComponentPropsWithoutRef<typeof Switch.Root>

const ThemeSwitch = ({ className, ...rest }: ThemeSwitchProps) => {
  return (
    <form className={className}>
      <div className={s.switchWrapper}>
        <Switch.Root className={s.switchRoot} {...rest} tabIndex={0}>
          <Switch.Thumb className={s.switchThumb} />
        </Switch.Root>
      </div>
    </form>
  )
}

export default ThemeSwitch
