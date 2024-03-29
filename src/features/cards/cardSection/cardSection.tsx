import { RefObject } from 'react'
import { FieldErrors, UseControllerProps } from 'react-hook-form'

import { Trash } from '@/assets/icons/trash'
import { Button } from '@/common/ui/button'
import { TextFieldControlled } from '@/common/ui/controlled'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Typography } from '@/common/ui/typography'
import { FormValuesAddCard } from '@/features/cards/utils/addNewCardModalSchema'
import { ImageIcon } from '@radix-ui/react-icons'

import s from '@/features/cards/cardForm/cardForm.module.scss'

type CardSectionProps<T extends FormValuesAddCard> = Omit<UseControllerProps<T>, 'disabled'> & {
  disabled?: boolean
  errors: FieldErrors<FormValuesAddCard>
  fileInputRef: RefObject<HTMLInputElement>
  label: string
  name: string
  openFileInput: () => void
  setCurrentPhoto: (image: File | null | string) => void
  uploadedImage: null | string
}
const CardSection = <T extends FormValuesAddCard>({
  control,
  disabled,
  errors,
  fileInputRef,
  label,
  name,
  openFileInput,
  setCurrentPhoto,
  uploadedImage,
  ...rest
}: CardSectionProps<T>) => {
  const removeImg = () => {
    setCurrentPhoto(null)
  }

  return (
    <>
      <Typography variant={'subtitle2'}>{label}:</Typography>
      <TextFieldControlled
        control={control}
        disabled={disabled}
        errorMessage={errors[name]?.message}
        label={label + '?'}
        name={name}
        {...rest}
      />
      <div>
        <ImageLoader className={s.fileInput} ref={fileInputRef} setPhoto={setCurrentPhoto} />
        {uploadedImage && (
          <div className={s.imageWrapper}>
            <img alt={'upload cover'} className={s.deckImage} src={uploadedImage} />
            <Trash className={s.icon} onClick={removeImg} tabIndex={0} />
          </div>
        )}
      </div>
      <Button
        className={s.uploadImageBtn}
        disabled={disabled}
        fullWidth
        onClick={e => {
          e.preventDefault()
          openFileInput()
        }}
        variant={'secondary'}
      >
        {<ImageIcon />}Change Image
      </Button>
    </>
  )
}

export default CardSection
