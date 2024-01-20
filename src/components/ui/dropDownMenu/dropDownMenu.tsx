import userDefaultPhoto from '@/assets/image/defaultAvatar.png'
import { Button } from '@/components/ui/button'
import { EditCardComponent } from '@/components/ui/dropDownMenu/variant/editCardComponent'
import { EditProfileComponent } from '@/components/ui/dropDownMenu/variant/editProfileComponent'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownMenu.module.scss'

type DropdownMenuProps = {
  defaultOpen?: boolean
  disabled?: boolean
  flag?: 'editCard' | 'editProfile'
  userEmail?: string
  userName?: string
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    defaultOpen = false,
    disabled,
    flag = 'editProfile',
    userEmail = 'j&johnson@gmail.com',
    userName = 'Ivan',
    ...rest
  } = props
  const classNames = {
    dropDownContent: clsx(s.DropdownMenuContent, flag === 'editProfile' && s.fullWidth),
  }

  return (
    <DropdownMenuRadix.Root defaultOpen>
      <DropdownMenuRadix.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton}>
          {flag === 'editProfile' ? (
            <img alt={'userPhoto'} className={s.UserAvatar} src={userDefaultPhoto} />
          ) : (
            <Button className={s.buttonDrop} variant={'link'} />
          )}
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          align={'end'}
          className={classNames.dropDownContent}
          sideOffset={5}
          {...rest}
        >
          {flag === 'editCard' ? (
            <EditCardComponent />
          ) : (
            <EditProfileComponent
              userAvatar={userDefaultPhoto}
              userEmail={userEmail}
              userName={userName}
            />
          )}

          <DropdownMenuRadix.Arrow asChild>
            <div className={s.arrow} />
          </DropdownMenuRadix.Arrow>
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}
