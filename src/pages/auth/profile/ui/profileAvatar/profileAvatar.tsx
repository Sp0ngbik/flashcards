import { RefObject, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { Edit } from '@/assets'
import { Trash } from '@/assets/icons/trash'
import defaultImage from '@/assets/image/defaultAvatar.png'
import { Button } from '@/common/ui/button'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Loader } from '@/common/ui/loader'
import { Modal } from '@/common/ui/modal'
import { Typography } from '@/common/ui/typography'
import { useUpdateProfileMutation } from '@/services/auth/auth.service'

import s from './profileAvatar.module.scss'
type ProfileAvatarProps = {
  avatar: null | string | undefined
}
const ProfileAvatar = ({ avatar }: ProfileAvatarProps) => {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)
  const [updateAvatar, { isLoading: isProfileUpdated }] = useUpdateProfileMutation()
  const [photo, setPhoto] = useState<File | null | string>(null)
  const [deleteStatus, setDeleteStatus] = useState(false)

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
      toast.success('User avatar changed')
      setPhoto(null)
    }
  }

  const openDeleteModal = async () => {
    setDeleteStatus(true)
  }
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const uploadedImage = () => {
    if (photo instanceof File) {
      return URL.createObjectURL(photo)
    }
    if (avatar) {
      return avatar
    }

    return defaultImage
  }

  const closeModal = () => {
    setDeleteStatus(false)
  }

  const onRemoveAvatar = async () => {
    const formData = new FormData()

    formData.append('avatar', '')
    setDeleteStatus(false)
    await updateAvatar(formData).unwrap()
    toast.success('User avatar removed')
    setPhoto(null)
  }

  return (
    <>
      <div className={s.photoWrapper}>
        <Modal onOpenChange={setDeleteStatus} open={deleteStatus} title={'Remove avatar'}>
          <div className={s.modalForm}>
            <Typography>Are you sure you want to remove your avatar?</Typography>
            <div className={s.buttonSection}>
              <Button onClick={closeModal} variant={'secondary'}>
                Cancel
              </Button>
              <Button onClick={onRemoveAvatar} variant={'primary'}>
                Remove avatar
              </Button>
            </div>
          </div>
        </Modal>
        <ImageLoader className={s.inputFile} ref={fileInputRef} setPhoto={onSetPhoto} />
        {isProfileUpdated ? (
          <Loader adaptiveVersion />
        ) : (
          <img alt={'user image'} className={s.profileImg} src={uploadedImage()} />
        )}
        {avatar !== null && (
          <button className={s.deleteButton} onClick={openDeleteModal}>
            <Trash className={s.trashIcon} />
          </button>
        )}
        <button className={s.profileEditImgBtn} onClick={openFileInput}>
          <Edit className={s.editIcon} />
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
    </>
  )
}

export default ProfileAvatar
