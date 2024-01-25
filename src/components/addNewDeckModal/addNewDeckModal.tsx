import { ChangeEvent, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormValuesAddDeck,
  addDeckSchema,
} from '@/components/addNewDeckModal/utils/addNewDeckModalSchema'
import { fileSchema } from '@/components/auth/profile/utils'
import { Button } from '@/components/ui/button'
import { CheckboxControlled, TextFieldControlled } from '@/components/ui/controlled'
import { ImageUploaderControlled } from '@/components/ui/controlled/imageUploaderControlled/imageUploaderControlled'
import { Modal } from '@/components/ui/modal'
import { Notification } from '@/components/ui/notification/notification'
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

export const AddNewDeckModal = ({ isOpen, onOpenChange, title }: AddNewDeckModalProps) => {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesAddDeck>({
    defaultValues: { filePath: '', isPrivate: false, name: '' },
    resolver: zodResolver(addDeckSchema),
  })

  const [fileError, setFileError] = useState<null | string>(null)
  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [photo, setPhoto] = useState<string>('')

  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = async (data: FormValuesAddDeck) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))
    formData.append('cover', data.filePath)

    for (const entry of formData.entries()) {
      const [name, value] = entry

      console.log(`${name}: ${value}`)
    }

    try {
      await createDeck(formData).unwrap()
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating deck:', error)
      // Обрабатываем ошибку
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

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)

      if (!err) {
        setPhoto(imageUrl)
      }
    }
  }

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
          <ImageUploaderControlled control={control} name={'filePath'} />
          <div>{photo && <img alt={'upload cover'} className={s.deckImage} src={photo} />}</div>
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
