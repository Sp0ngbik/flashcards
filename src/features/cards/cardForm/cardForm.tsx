import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'
import CardSection from '@/features/cards/createNewCard/cardSection/cardSection'
import {
  FormValuesAddCard,
  addCardSchema,
} from '@/features/cards/createNewCard/utils/addNewCardModalSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '@/features/cards/createNewCard/addNewCardModal.module.scss'

type AddNewDeckModalProps = {
  card?: EditCardType
  id?: string
  isLoading?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmitCard: (data: FormData) => void
  title: string
}

export type EditCardType = {
  answer: string
  answerImg: string | undefined
  id?: string
  question: string
  questionImg: string | undefined
}

export const CardForm = ({
  card,
  isLoading,
  isOpen,
  onOpenChange,
  onSubmitCard,
  title,
}: AddNewDeckModalProps) => {
  const fileQuestionInputRef: RefObject<HTMLInputElement> = useRef(null)
  const fileAnswerInputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormValuesAddCard>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(addCardSchema),
  })

  useEffect(() => {
    if (card) {
      setValue('answer', card.answer || '')
      setValue('question', card.question || '')

      setCurrentAnswerPhoto(card.answerImg)
      setCurrentQuestionPhoto(card.questionImg)
    }
  }, [card, setValue])

  const [questionPhoto, setQuestionPhoto] = useState<File | null>(null)
  const [answerPhoto, setAnswerPhoto] = useState<File | null>(null)
  const [currentAnswerPhoto, setCurrentAnswerPhoto] = useState(card?.answerImg)
  const [currentQuestionPhoto, setCurrentQuestionPhoto] = useState(card?.questionImg)
  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = async (data: FormValuesAddCard) => {
    try {
      const formData = new FormData()

      formData.append('question', data.question)
      formData.append('answer', data.answer)

      if (questionPhoto) {
        formData.append('questionImg', questionPhoto)
      } else {
        formData.append('questionImg', '')
      }
      if (answerPhoto) {
        formData.append('answerImg', answerPhoto)
      } else {
        formData.append('answerImg', '')
      }

      onSubmitCard(formData)

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

  const uploadedQuestionImage = questionPhoto
    ? URL.createObjectURL(questionPhoto)
    : currentQuestionPhoto
  const uploadedAnswerImage = answerPhoto ? URL.createObjectURL(answerPhoto) : currentAnswerPhoto

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
            setPhoto={setQuestionPhoto}
            uploadedImage={uploadedQuestionImage}
          />
          <CardSection
            control={control}
            errors={errors}
            fileInputRef={fileAnswerInputRef}
            label={'Answer'}
            name={'answer'}
            openFileInput={openAnswerFileInput}
            setPhoto={setAnswerPhoto}
            uploadedImage={uploadedAnswerImage}
          />
          <div className={s.btnArea}>
            <Button disabled={isLoading} form={'hook-form'} type={'submit'} variant={'primary'}>
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
