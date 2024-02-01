import { FC, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit } from '@/assets/icons/edit'
import { Card } from '@/common/ui/card'
import { FormFile, fileSchema } from '@/common/ui/imageLoader/fileSchema'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Typography } from '@/common/ui/typography'
import { ProfileEditBody } from '@/pages/auth/profile/profileEditBody'
import { FormProfile } from '@/pages/auth/profile/useEditProfile'
import { useMeQuery } from '@/services/auth/auth.sevice'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './profile.module.scss'

import defaultImage from '../../../assets/image/defaultAvatar.png'

export type ProfileProps = {
  edit?: boolean
}

export const Profile: FC<ProfileProps> = ({ edit = false }) => {
  const { data: me } = useMeQuery()
  const [editMode, setEditMode] = useState<boolean>(edit)
  const [photo, setPhoto] = useState<File | null>(null)

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
      <Card>
        <Typography className={s.profileLabel} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.profileBlock}>
          <div className={s.photoWrapper}>
            <form className={s.form} onSubmit={handleSubmitFileForm(onSubmitFileForm)}>
              <ImageLoader className={s.inputFile} ref={fileInputRef} setPhoto={setPhoto} />
              <img alt={'user image'} className={s.profileImg} src={uploadedImage} />
              <button className={s.profileEditImgBtn} onClick={openFileInput}>
                <Edit />
              </button>
            </form>
          </div>

          <ProfileEditBody
            editMode={editMode}
            email={me?.email}
            nickname={me?.name ?? ''}
            onEditOnHandler={onEditOnHandler}
            onSubmit={onSubmit}
          />
        </div>
      </Card>
    </>
  )
}
