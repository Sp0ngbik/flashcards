import { useState } from 'react'
import { toast } from 'react-toastify'

import { Edit, LogOut } from '@/assets'
import { Button } from '@/common/ui/button'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import { FormProfile, useEditProfile } from '@/pages/auth/profile/utils/useEditProfile'
import { useLogoutMutation, useUpdateProfileMutation } from '@/services/auth/auth.service'
import { ErrorResponse } from '@/services/auth/auth.types'

import s from './profileEditBody.module.scss'

type Props = {
  editStatus: boolean
  email?: string
  nickname: string
}

export const ProfileEditBody = ({ editStatus, email, nickname }: Props) => {
  const [updateName] = useUpdateProfileMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useEditProfile({ nickname })
  const [editMode, setEditMode] = useState<boolean>(editStatus)

  const [logout] = useLogoutMutation()
  const onEditOnHandler = () => {
    setEditMode(true)
  }

  const onEditOffHandler = () => {
    setEditMode(false)
  }
  const onSubmit = async (data: FormProfile) => {
    try {
      const formData = new FormData()

      formData.append('name', data.nickname)
      await toast.promise(updateName(formData).unwrap, {
        pending: 'In progress',
        success: 'Name was updated',
      })
      onEditOffHandler()
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? 'Could not change username')
    }
  }

  const onLogout = () => {
    logout()
  }

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
        <Button className={s.saveChanges} fullWidth type={'submit'}>
          Save Changes
        </Button>
        <Button fullWidth onClick={onEditOffHandler} type={'button'} variant={'secondary'}>
          Cancel
        </Button>
      </form>
    )
  }

  return (
    <div className={s.profileEditWrapper}>
      <Typography className={s.profileName} variant={'h2'}>
        {nickname}
        <button className={s.profileEditNameBtn} onClick={onEditOnHandler}>
          <Edit />
        </button>
      </Typography>
      <Typography className={s.userEmail} variant={'body2'}>
        {email}
      </Typography>
      <Button className={s.logoutBtn} onClick={onLogout} variant={'secondary'}>
        <LogOut className={s.logoutIcon} />
        Logout
      </Button>
    </div>
  )
}
