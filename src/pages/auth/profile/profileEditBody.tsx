import { Edit, LogOut } from '@/assets'
import { Button } from '@/common/ui/button'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import { FormProfile, useEditProfile } from '@/pages/auth/profile/useEditProfile'
import { useLogoutMutation } from '@/services/auth/auth.sevice'

import s from './profile.module.scss'

type Props = {
  editMode: boolean
  email?: string
  nickname: string
  onEditOnHandler: () => void
  onSubmit: (data: FormProfile) => void
}

export const ProfileEditBody = ({
  editMode,
  email,
  nickname,
  onEditOnHandler,
  onSubmit,
}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useEditProfile({ nickname })
  const [logout] = useLogoutMutation()

  if (editMode) {
    return (
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextFieldControlled
          className={s.editNameField}
          control={control}
          errorMessage={errors.nickname?.message}
          id={'nickname'}
          label={'Nickname'}
          name={'nickname'}
          placeholder={'nickname'}
        />
        <Button fullWidth>Save Changes</Button>
      </form>
    )
  }

  return (
    <div className={s.profileWrapper}>
      <Typography className={s.profileName} variant={'h2'}>
        {nickname}
        <button className={s.profileEditNameBtn} onClick={onEditOnHandler}>
          <Edit />
        </button>
      </Typography>
      <Typography className={s.userEmail} variant={'body2'}>
        {email}
      </Typography>
      <Button className={s.logoutBtn} onClick={() => logout()} variant={'secondary'}>
        <LogOut className={s.logoutIcon} />
        Logout
      </Button>
    </div>
  )
}
