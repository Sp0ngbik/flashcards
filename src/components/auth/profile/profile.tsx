import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { LogOut } from '@/assets'
import { Edit } from '@/assets/icons/edit'
import { FormProfile, profileSchema } from '@/components/auth/profile/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextFieldControlled } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './profile.module.scss'

import defaultImage from '../../../assets/image/defaultAvatar.png'

type ProfileProps = {
  email: string
  nickname: string
}

export const Profile: FC<ProfileProps> = ({
  email = 'useremail@mail.com',
  nickname = 'profile_nickname',
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [addPhoto, setAddPhoto] = useState<boolean>(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProfile>({
    defaultValues: { nickname: nickname },
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = (data: FormProfile) => {
    console.log(data)
    onEditOffHandler()
  }

  const onEditOnHandler = () => {
    setEditMode(true)
  }

  const onEditOffHandler = () => {
    setEditMode(false)
  }

  const onAddPhotoOnHandler = () => {
    setAddPhoto(true)
  }

  return (
    <Card>
      <Typography className={s.profileLabel} variant={'h1'}>
        Personal Information
      </Typography>
      <div className={s.profileBlock}>
        <div className={s.photoWrapper}>
          {addPhoto ? (
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <img alt={'user image'} className={s.profileImg} src={defaultImage} />
              <input className={s.editNameField} type={'file'}></input>

              <Button fullWidth>Save Changes</Button>
            </form>
          ) : (
            <div>
              <img alt={'user image'} className={s.profileImg} src={defaultImage} />
              {!addPhoto && (
                <span className={s.profileEditImgBtn} onClick={onAddPhotoOnHandler}>
                  <Edit />
                </span>
              )}
            </div>
          )}
        </div>

        {editMode ? (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextFieldControlled
              className={s.editNameField}
              control={control}
              errorMessage={errors.nickname?.message}
              label={'Nickname'}
              name={'nickname'}
              placeholder={'nickname'}
            />
            <Button fullWidth>Save Changes</Button>
          </form>
        ) : (
          <div className={s.profileWrapper}>
            <Typography className={s.profileName} variant={'h2'}>
              Username
              <span className={s.profileEditNameBtn} onClick={onEditOnHandler}>
                <Edit />
              </span>
            </Typography>
            <Typography className={s.userEmail} variant={'body2'}>
              {email}
            </Typography>
            <Button className={s.logoutBtn} variant={'secondary'}>
              <LogOut className={s.logoutIcon} />
              Logout
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
