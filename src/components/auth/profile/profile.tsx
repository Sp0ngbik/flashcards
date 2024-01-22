import { ChangeEvent, FC, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit } from '@/assets/icons/edit'
import { ProfileEditBody } from '@/components/auth/profile/profileEditBody'
import { FormProfile } from '@/components/auth/profile/useEditProfile'
import { FormFile, fileSchema } from '@/components/auth/profile/utils'
import { Card } from '@/components/ui/card'
import { Notification } from '@/components/ui/notification/notification'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodError } from 'zod'

import s from './profile.module.scss'

import defaultImage from '../../../assets/image/defaultAvatar.png'

export type ProfileProps = {
  edit?: boolean
  email?: string
  nickname: string
}

export const Profile: FC<ProfileProps> = ({ edit = false, email, nickname }) => {
  const [editMode, setEditMode] = useState<boolean>(edit)
  const [photo, setPhoto] = useState<string>(defaultImage)
  const [fileError, setFileError] = useState<null | string>(null)

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
      <Notification message={fileError} resetError={setFileError} />
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

          <ProfileEditBody
            editMode={editMode}
            email={email}
            nickname={nickname}
            onEditOnHandler={onEditOnHandler}
            onSubmit={onSubmit}
          />
        </div>
      </Card>
    </>
  )
}
