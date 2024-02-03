import { FC, RefObject, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Edit } from '@/assets/icons/edit'
import defaultImage from '@/assets/image/defaultAvatar.png'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Typography } from '@/common/ui/typography'
import { ProfileEditBody } from '@/pages/auth/profile/profileEditBody'
import { FormProfile } from '@/pages/auth/profile/utils/useEditProfile'
import { useMeQuery, useUpdateProfileMutation } from '@/services/auth/auth.sevice'

import s from './profile.module.scss'

export type ProfileProps = {
  edit?: boolean
}

export const Profile: FC<ProfileProps> = ({ edit = false }) => {
  const { data: me } = useMeQuery()
  const [editMode, setEditMode] = useState<boolean>(edit)
  const [photo, setPhoto] = useState<File | null>(null)
  const [isPhotoChanged, setIsPhotoChanged] = useState<boolean>(false)
  const [updateProfile] = useUpdateProfileMutation()
  const onSubmit = (data: FormProfile) => {
    updateProfile({ name: data.nickname })
    onEditOffHandler()
  }

  const onSetPhoto = (data: File) => {
    setPhoto(data)
    setIsPhotoChanged(true)
  }

  const cancelPhotoChange = () => {
    setPhoto(null)
    setIsPhotoChanged(false)
  }

  const savePhotoChange = () => {
    const formData = new FormData()

    if (photo) {
      formData.append('avatar', photo)
      updateProfile(formData)
      setIsPhotoChanged(false)
      toast.success('User avatar changed')
    }
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

  const uploadedImage = () => {
    if (photo) {
      return URL.createObjectURL(photo)
    }
    if (me?.avatar) {
      return me.avatar
    }

    return defaultImage
  }

  return (
    <div className={s.profileWrapper}>
      <NavLink className={s.backToDeck} to={'/'}>
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </NavLink>
      <Card>
        <Typography className={s.profileLabel} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.profileBlock}>
          <div className={s.photoWrapper}>
            <ImageLoader className={s.inputFile} ref={fileInputRef} setPhoto={onSetPhoto} />
            <img alt={'user image'} className={s.profileImg} src={uploadedImage()} />
            <button className={s.profileEditImgBtn} onClick={openFileInput}>
              <Edit />
            </button>
          </div>
          {isPhotoChanged && (
            <div className={s.imageAction}>
              <Button onClick={savePhotoChange} variant={'primary'}>
                Save
              </Button>
              <Button onClick={cancelPhotoChange} variant={'secondary'}>
                Cancel
              </Button>
            </div>
          )}

          <ProfileEditBody
            editMode={editMode}
            email={me?.email}
            nickname={me?.name ?? ''}
            onEditOffHandler={onEditOffHandler}
            onEditOnHandler={onEditOnHandler}
            onSubmit={onSubmit}
          />
        </div>
      </Card>
    </div>
  )
}
