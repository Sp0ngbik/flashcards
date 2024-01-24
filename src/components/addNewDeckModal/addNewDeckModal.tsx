import { ChangeEvent, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormValuesAddDeck,
  addDeckSchema,
} from '@/components/addNewDeckModal/utils/addNewDeckModalSchema'
import { fileSchema } from '@/components/auth/profile/utils'
import { Button } from '@/components/ui/button'
import { CheckboxControlled, TextFieldControlled } from '@/components/ui/controlled'
import { Modal } from '@/components/ui/modal'
import { Notification } from '@/components/ui/notification/notification'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from '@radix-ui/react-icons'
import { ZodError } from 'zod'

import s from './addNewDeckModal.module.scss'

type AddNewDeckModalProps = {
  createDeck: (data: FormValuesAddDeck) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const AddNewDeckModal = ({
  createDeck,
  isOpen,
  onOpenChange,
  title,
}: AddNewDeckModalProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesAddDeck>({
    defaultValues: { file: undefined, name: '', private: false },
    resolver: zodResolver(addDeckSchema),
  })

  const [fileError, setFileError] = useState<null | string>(null)

  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = (data: FormValuesAddDeck) => {
    console.log(data)
    createDeck(data)
    onOpenChange(false)
  }

  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

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
        console.log(imageUrl)
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
          ></TextFieldControlled>
          <input
            id={'imgupload'}
            name={'avatar'}
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type={'file'}
          />
          <Button
            className={s.uploadImageBtn}
            fullWidth
            onClick={openFileInput}
            variant={'secondary'}
          >
            {<ImageIcon />}Upload Image
          </Button>
          <CheckboxControlled control={control} name={'private'} text={'Private pack'} />
          <div className={s.btnArea}>
            <Button form={'hook-form'} type={'submit'} variant={'primary'}>
              Add New Pack
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
