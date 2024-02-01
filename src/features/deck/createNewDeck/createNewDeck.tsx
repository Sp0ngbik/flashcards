import { RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { CheckboxControlled, TextFieldControlled } from '@/common/ui/controlled'
import ImageLoader from '@/common/ui/imageLoader/imageLoader'
import { Modal } from '@/common/ui/modal'
import {
  FormValuesAddDeck,
  addDeckSchema,
} from '@/features/deck/createNewDeck/utils/addNewDeckModalSchema'
import { useCreateDeckMutation } from '@/services/decks/decks.service.'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from '@radix-ui/react-icons'

import s from './addNewDeckModal.module.scss'

type AddNewDeckModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const CreateNewDeck = ({ isOpen, onOpenChange, title }: AddNewDeckModalProps) => {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesAddDeck>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(addDeckSchema),
  })

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [photo, setPhoto] = useState<File | null>(null)
  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = async (data: FormValuesAddDeck) => {
    try {
      const formData = new FormData()

      if (photo) {
        formData.append('cover', photo)
      }
      formData.append('name', data.name)
      formData.append('isPrivate', String(data.isPrivate))

      onOpenChange(false)
      await createDeck(formData).unwrap()
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

  const uploadedImage = photo ? URL.createObjectURL(photo) : ''

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
            <Button
              disabled={isDeckBeingCreated}
              form={'hook-form'}
              type={'submit'}
              variant={'primary'}
            >
              Add New Deck
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
