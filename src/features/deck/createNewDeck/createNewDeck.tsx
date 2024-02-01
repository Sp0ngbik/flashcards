import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { CheckboxControlled, TextFieldControlled } from '@/common/ui/controlled'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Modal } from '@/common/ui/modal'
import {
  FormValuesAddDeck,
  addDeckSchema,
} from '@/features/deck/createNewDeck/utils/addNewDeckModalSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from '@radix-ui/react-icons'

import s from './addNewDeckModal.module.scss'

type AddNewDeckModalProps = {
  deck?: EditDeckType
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmitDeck: (data: any) => void
  title: string
}

export type EditDeckType = {
  cover: string | undefined
  id?: string
  isPrivate: boolean
  name: string
}

export const CreateNewDeck = ({
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
    setValue,
  } = useForm<FormValuesAddDeck>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(addDeckSchema),
  })

  useEffect(() => {
    if (deck) {
      setValue('name', deck.name || '')
      setValue('isPrivate', deck.isPrivate || false)
      setPhoto(deck.cover ? new File([], deck.cover) : null)
    }
  }, [deck, setValue])

  const [photo, setPhoto] = useState<File | null>(null)

  const closeHandler = () => {
    onOpenChange(false)
  }

  console.log(deck?.cover)

  const onSubmit = async (data: FormValuesAddDeck) => {
    try {
      const formData = new FormData()

      if (photo) {
        formData.append('cover', photo)
      }
      formData.append('name', data.name)
      formData.append('isPrivate', String(data.isPrivate))

      onOpenChange(false)
      onSubmitDeck(formData)
      setPhoto(null)
    } catch (error) {
      console.error('Error creating deck:', error)
    }
  }

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const uploadedImage = photo ? URL.createObjectURL(photo) : deck?.cover

  return (
    <>
      <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} id={'hook-form'} onSubmit={handleSubmit(onSubmit)}>
          <TextFieldControlled
            control={control}
            errorMessage={errors.name?.message}
            label={'Name Pack'}
            name={'name'}
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
            {<ImageIcon />}Upload Image
          </Button>
          <CheckboxControlled control={control} name={'isPrivate'} text={'Private pack'} />
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
