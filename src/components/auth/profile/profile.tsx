import { ChangeEvent, FC, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { LogOut } from '@/assets'
import { Edit } from '@/assets/icons/edit'
import { FormFile, FormProfile, fileSchema, profileSchema } from '@/components/auth/profile/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextFieldControlled } from '@/components/ui/controlled'
import { Notification } from '@/components/ui/notification/notification'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodError } from 'zod'

import s from './profile.module.scss'

import defaultImage from '../../../assets/image/defaultAvatar.png'

export type ProfileProps = {
  edit?: boolean
  email?: string
  nickname?: string
}

export const Profile: FC<ProfileProps> = ({
  edit = false,
  email = 'useremail@mail.com',
  nickname = 'profile_nickname',
}) => {
  const [editMode, setEditMode] = useState<boolean>(edit)
  const [photo, setPhoto] = useState<string>(defaultImage)
  const [fileError, setFileError] = useState<null | string>(null)

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

  const { handleSubmit: handleSubmitFileForm } = useForm<FormFile>({
    resolver: zodResolver(fileSchema),
  })

  const onSubmitFileForm = (data: FormFile) => {
    console.log(data)
    onEditOffHandler()
  }

  const onEditOnHandler = () => {
    setEditMode(true)
  }

  const onEditOffHandler = () => {
    setEditMode(false)
  }

  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    let err = null

    try {
      fileSchema.parse(selectedFile)
      setFileError(null)
    } catch (error: unknown) {
      err = error
      if (error instanceof ZodError) {
        setFileError(error.errors?.[0]?.message || 'File validation error')
      } else {
        console.error('Unexpected error type:', error)
      }
    }

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)

      if (!err) {
        setPhoto(imageUrl)
      }
    }
  }

  return (
    <>
      {fileError && <Notification message={fileError} />}
      <Card>
        <Typography className={s.profileLabel} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.profileBlock}>
          <div className={s.photoWrapper}>
            <form className={s.form} onSubmit={handleSubmitFileForm(onSubmitFileForm)}>
              <input
                id={'imgupload'}
                name={'avatar'}
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type={'file'}
              />
              <img alt={'user image'} className={s.profileImg} src={photo} />
              <button className={s.profileEditImgBtn} onClick={openFileInput}>
                <Edit />
              </button>
            </form>
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
                {nickname}
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
    </>
  )
}
