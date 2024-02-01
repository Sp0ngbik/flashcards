import { DotsForDropDown } from '@/assets/icons/dotsForDropDown'
import userDefaultPhoto from '@/assets/image/defaultAvatar.png'
import { EditCardComponent } from '@/common/ui/dropDownMenu/variant/editCardComponent'
import { EditProfileComponent } from '@/common/ui/dropDownMenu/variant/editProfileComponent'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownMenu.module.scss'

type DropdownMenuProps = {
  defaultOpen?: boolean
  deleteDeck?: () => void
  disabled?: boolean
  flag?: 'editCard' | 'editProfile'
  logout: () => void
  userEmail?: string
  userName?: string
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    defaultOpen = false,
    deleteDeck,
    disabled,
    flag = 'editProfile',
    logout,
    userEmail,
    userName,
    ...rest
  } = props
  const classNames = {
    dropDownContent: clsx(s.DropdownMenuContent, flag === 'editProfile' && s.fullWidth),
  }

  return (
    <DropdownMenuRadix.Root defaultOpen={defaultOpen}>
      <DropdownMenuRadix.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton}>
          {flag === 'editProfile' ? (
            <img alt={'userPhoto'} className={s.UserAvatar} src={userDefaultPhoto} />
          ) : (
            <DotsForDropDown className={s.dotsDrop} />
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
            <EditCardComponent deleteDeck={deleteDeck} />
          ) : (
            <EditProfileComponent
              logout={logout}
              userAvatar={userDefaultPhoto}
              userEmail={userEmail ? userEmail : 'None'}
              userName={userName ? userName : 'None'}
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
