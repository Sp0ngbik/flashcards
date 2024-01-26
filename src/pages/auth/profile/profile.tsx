import { FC, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit } from '@/assets/icons/edit'
import { Card } from '@/common/ui/card'
import { FormFile, fileSchema } from '@/common/ui/imageLoader/fileSchema'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Notification } from '@/common/ui/notification/notification'
import { Typography } from '@/common/ui/typography'
import { ProfileEditBody } from '@/pages/auth/profile/profileEditBody'
import { FormProfile } from '@/pages/auth/profile/useEditProfile'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './profile.module.scss'

import defaultImage from '../../../assets/image/defaultAvatar.png'

export type ProfileProps = {
  edit?: boolean
  email?: string
  nickname: string
}

export const Profile: FC<ProfileProps> = ({ edit = false, email, nickname }) => {
  const [editMode, setEditMode] = useState<boolean>(edit)
  const [photo, setPhoto] = useState<File | null>(null)
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
  const uploadedImage = photo ? URL.createObjectURL(photo) : defaultImage

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
              <ImageLoader
                className={s.inputFile}
                ref={fileInputRef}
                setFileError={setFileError}
                setPhoto={setPhoto}
              />
              <img alt={'user image'} className={s.profileImg} src={uploadedImage} />
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
