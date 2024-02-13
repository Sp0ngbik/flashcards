import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Trash } from '@/assets/icons/trash'
import { Button } from '@/common/ui/button'
import { CheckboxControlled, TextFieldControlled } from '@/common/ui/controlled'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Modal } from '@/common/ui/modal'
import { FormValuesAddDeck, addDeckSchema } from '@/features/deck/utils/addNewDeckModalSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from '@radix-ui/react-icons'

import s from '@/features/deck/deckForm/deckForm.module.scss'

export type EditDeckType = {
  cover: null | string | undefined
  id?: string
  isPrivate: boolean
  name: string
}

type AddNewDeckModalProps = {
  deck?: EditDeckType
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmitDeck: (data: FormData) => void
  title: string
}

const DeckForm = ({
  deck,
  disabled,
  isOpen,
  onOpenChange,
  onSubmitDeck,
  title,
}: AddNewDeckModalProps) => {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValuesAddDeck>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(addDeckSchema),
  })

  useEffect(() => {
    if (deck) {
      setValue('name', deck.name || '')
      setValue('isPrivate', deck.isPrivate || false)
      setPhoto(deck.cover ?? null)
    }
  }, [deck, setValue])

  const [photo, setPhoto] = useState<File | null | string>(null)

  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = async (data: FormValuesAddDeck) => {
    const formData = new FormData()

    if (photo instanceof File) {
      formData.append('cover', photo)
    } else if (photo === null) {
      formData.append('cover', '')
    }
    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))
    onOpenChange(false)
    onSubmitDeck(formData)
    setPhoto(null)
    reset()
  }

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removeImg = () => {
    setPhoto(null)
  }

  const uploadedImage = photo instanceof File ? URL.createObjectURL(photo) : photo

  return (
    <>
      <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} id={'hook-form'} onSubmit={handleSubmit(onSubmit)}>
          <TextFieldControlled
            control={control}
            disabled={disabled}
            errorMessage={errors.name?.message}
            label={'Name Pack'}
            name={'name'}
          />
          <div>
            {uploadedImage && (
              <div className={s.imageWrapper}>
                <img alt={'image not found'} className={s.deckImage} src={uploadedImage} />
                <Trash className={s.icon} onClick={removeImg} tabIndex={0} />
              </div>
            )}
            <ImageLoader className={s.fileInput} ref={fileInputRef} setPhoto={setPhoto} />
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
            {<ImageIcon />}Upload Image
          </Button>
          <CheckboxControlled
            control={control}
            disabled={disabled}
            name={'isPrivate'}
            text={'Private pack'}
          />
          <div className={s.btnArea}>
            <Button disabled={disabled} form={'hook-form'} type={'submit'} variant={'primary'}>
              {title}
            </Button>
            <Button onClick={closeHandler} type={'reset'} variant={'secondary'}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default DeckForm
