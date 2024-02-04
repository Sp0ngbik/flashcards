import { DotsForDropDown } from '@/assets/icons/dotsForDropDown'
import userDefaultPhoto from '@/assets/image/defaultAvatar.png'
import { EditCardComponent } from '@/common/ui/dropDownMenu/variant/editCardComponent'
import { EditProfileComponent } from '@/common/ui/dropDownMenu/variant/editProfileComponent'
import { useLogoutMutation } from '@/services/auth/auth.sevice'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownMenu.module.scss'

type DropdownMenuProps = {
  className?: string
  defaultOpen?: boolean
  disabled?: boolean
  flag?: 'editCard' | 'editProfile'
  learnDeck?: () => void
  onEditClick?: () => void
  onOpenDeleteForm?: (open: boolean) => void
  userAvatar?: null | string
  userEmail?: string
  userName?: string
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    className,
    defaultOpen = false,
    disabled,
    flag = 'editProfile',
    learnDeck,
    onEditClick,
    onOpenDeleteForm,
    userAvatar,
    userEmail,
    userName,
    ...rest
  } = props
  const classNames = {
    dropDownContent: clsx(s.DropdownMenuContent, flag === 'editProfile' && s.fullWidth),
  }
  const [logout] = useLogoutMutation()
  const onEditHandler = () => {
    return onEditClick ? onEditClick() : ''
  }

  return (
    <DropdownMenuRadix.Root defaultOpen={defaultOpen}>
      <DropdownMenuRadix.Trigger asChild className={className}>
        <button aria-label={'Customise options'} className={s.IconButton}>
          {flag === 'editProfile' ? (
            <img alt={'userPhoto'} className={s.userAvatar} src={userAvatar ?? userDefaultPhoto} />
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
            <EditCardComponent
              learn={learnDeck}
              onEditClick={onEditHandler}
              onOpenDeleteForm={onOpenDeleteForm}
            />
          ) : (
            <EditProfileComponent
              logout={logout}
              userAvatar={userAvatar ?? userDefaultPhoto}
              userEmail={userEmail ?? 'None'}
              userName={userName ?? 'None'}
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
