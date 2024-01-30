import { RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'
import CardSection from '@/features/cards/createNewCard/cardSection/cardSection'
import {
  FormValuesAddCard,
  addCardSchema,
} from '@/features/cards/createNewCard/utils/addNewCardModalSchema'
import { useCreateCardMutation } from '@/services/cards/cards.service'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addNewCardModal.module.scss'

type AddNewDeckModalProps = {
  id?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const CreateNewCard = ({ id, isOpen, onOpenChange, title }: AddNewDeckModalProps) => {
  const fileQuestionInputRef: RefObject<HTMLInputElement> = useRef(null)
  const fileAnswerInputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesAddCard>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(addCardSchema),
  })

  const [createCard, { isLoading }] = useCreateCardMutation()
  const [questionPhoto, setQuestionPhoto] = useState<File | null>(null)
  const [answerPhoto, setAnswerPhoto] = useState<File | null>(null)
  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = async (data: FormValuesAddCard) => {
    try {
      const formData = new FormData()

      if (questionPhoto) {
        formData.append('questionImg', questionPhoto)
      }
      if (answerPhoto) {
        formData.append('answerImg', answerPhoto)
      }
      formData.append('question', data.question)
      formData.append('answer', data.answer)
      await createCard({ data, id: id! }).unwrap()

      setQuestionPhoto(null)
      setAnswerPhoto(null)
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating card:', error)
    }
  }

  const openQuestionFileInput = () => {
    if (fileQuestionInputRef.current) {
      fileQuestionInputRef.current.click()
    }
  }

  const openAnswerFileInput = () => {
    if (fileAnswerInputRef.current) {
      fileAnswerInputRef.current.click()
    }
  }

  const uploadedImage = questionPhoto ? URL.createObjectURL(questionPhoto) : ''
  const uploadedAnswerImage = answerPhoto ? URL.createObjectURL(answerPhoto) : ''

  return (
    <>
      <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} id={'hook-form'} onSubmit={handleSubmit(onSubmit)}>
          <CardSection
            control={control}
            errors={errors}
            fileInputRef={fileQuestionInputRef}
            label={'Question'}
            name={'question'}
            openFileInput={openQuestionFileInput}
            photo={questionPhoto}
            setPhoto={setQuestionPhoto}
            uploadedImage={uploadedImage}
          />
          <CardSection
            control={control}
            errors={errors}
            fileInputRef={fileAnswerInputRef}
            label={'Answer'}
            name={'answer'}
            openFileInput={openAnswerFileInput}
            photo={answerPhoto}
            setPhoto={setAnswerPhoto}
            uploadedImage={uploadedAnswerImage}
          />
          <div className={s.btnArea}>
            <Button disabled={isLoading} form={'hook-form'} type={'submit'} variant={'primary'}>
              Add New Card
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
