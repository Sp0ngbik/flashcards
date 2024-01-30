import { RefObject } from 'react'
import { FieldErrors, UseControllerProps } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { TextFieldControlled } from '@/common/ui/controlled'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Typography } from '@/common/ui/typography'
import { FormValuesAddCard } from '@/features/cards/createNewCard/utils/addNewCardModalSchema'
import { ImageIcon } from '@radix-ui/react-icons'

import s from '@/features/cards/createNewCard/addNewCardModal.module.scss'

type CardSectionProps<T extends FormValuesAddCard> = Omit<UseControllerProps<T>, 'disabled'> & {
  errors: FieldErrors<FormValuesAddCard>
  fileInputRef: RefObject<HTMLInputElement>
  label: string
  name: string
  openFileInput: () => void
  photo: File | null
  setPhoto: (image: File) => void
  uploadedImage: string
}
const CardSection = <T extends FormValuesAddCard>({
  control,
  errors,
  fileInputRef,
  label,
  name,
  openFileInput,
  photo,
  setPhoto,
  uploadedImage,
  ...rest
}: CardSectionProps<T>) => {
  return (
    <>
      <Typography variant={'subtitle2'}>{label}:</Typography>
      <TextFieldControlled
        control={control}
        errorMessage={errors[name]?.message}
        label={label + '?'}
        name={name}
        {...rest}
      />
      <div>
        {photo && <img alt={'upload cover'} className={s.deckImage} src={uploadedImage} />}
        <ImageLoader className={s.fileInput} ref={fileInputRef} setPhoto={setPhoto} />
      </div>
      <Button
        className={s.uploadImageBtn}
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
