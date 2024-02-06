import { FC, RefObject, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Edit } from '@/assets/icons/edit'
import defaultImage from '@/assets/image/defaultAvatar.png'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Loader } from '@/common/ui/loader'
import { Typography } from '@/common/ui/typography'
import { ProfileEditBody } from '@/pages/auth/profile/ui/profileEditBody/profileEditBody'
import { useMeQuery, useUpdateProfileMutation } from '@/services/auth/auth.service'

import s from './profile.module.scss'

export type ProfileProps = {
  editStatus?: boolean
}

export const Profile: FC<ProfileProps> = ({ editStatus = false }) => {
  const [photo, setPhoto] = useState<File | null | string>(null)
  const { data: me } = useMeQuery()

  const [updateAvatar, { isLoading: isProfileUpdated }] = useUpdateProfileMutation()

  const onSetPhoto = (data: File) => {
    setPhoto(data)
  }

  const cancelPhotoChange = () => {
    setPhoto(null)
  }

  const savePhotoChange = async () => {
    const formData = new FormData()

    if (photo) {
      formData.append('avatar', photo)
      await updateAvatar(formData).unwrap()
      setPhoto(null)
      toast.success('User avatar changed')
    }
  }

  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const uploadedImage = () => {
    if (photo instanceof File) {
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
            {isProfileUpdated ? (
              <Loader smallVersion />
            ) : (
              <img alt={'user image'} className={s.profileImg} src={uploadedImage()} />
            )}

            <button className={s.profileEditImgBtn} onClick={openFileInput}>
              <Edit />
            </button>
          </div>
          {photo && (
            <div className={s.imageAction}>
              <Button onClick={savePhotoChange} variant={'primary'}>
                Save
              </Button>
              <Button onClick={cancelPhotoChange} variant={'secondary'}>
                Cancel
              </Button>
            </div>
          )}

          <ProfileEditBody editStatus={editStatus} email={me?.email} nickname={me?.name ?? ''} />
        </div>
      </Card>
    </div>
  )
}
