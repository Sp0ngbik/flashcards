import { ChangeEvent, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { CheckboxControlled, TextFieldControlled } from '@/common/ui/controlled'
import { Modal } from '@/common/ui/modal'
import { Notification } from '@/common/ui/notification/notification'
import {
  FormValuesAddDeck,
  addDeckSchema,
} from '@/features/deck/createNewDeck/utils/addNewDeckModalSchema'
import { fileSchema } from '@/pages/auth/profile/utils'
import { useCreateDeckMutation } from '@/services/decks/decks.service.'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from '@radix-ui/react-icons'
import { ZodError } from 'zod'

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

  const [fileError, setFileError] = useState<null | string>(null)
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

      await createDeck(formData).unwrap()
      setPhoto(null)
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating deck:', error)
    }
  }

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    let err = null

    try {
      fileSchema.parse(selectedFile)
      setFileError(null)
    } catch (error: unknown) {
      err = error
      if (error instanceof ZodError) {
        setFileError(error.errors?.[0]?.message || 'File validation error')
      } else {
        console.error('Unexpected error type:', error)
      }
    }

    if (!err) {
      selectedFile && setPhoto(selectedFile)
    }
  }
  const uploadedImage = photo ? URL.createObjectURL(photo) : ''

  return (
    <>
      <Notification message={fileError} resetError={setFileError} />
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
            <input
              className={s.fileInput}
              onChange={handleFileChange}
              ref={fileInputRef}
              type={'file'}
            />
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
