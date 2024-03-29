import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'
import CardSection from '@/features/cards/cardSection/cardSection'
import { FormValuesAddCard, addCardSchema } from '@/features/cards/utils/addNewCardModalSchema'
import { CardBody } from '@/services/cards/cards.types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '@/features/cards/cardForm/cardForm.module.scss'

type AddNewDeckModalProps = {
  card?: EditCardType
  id?: string
  isLoading?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmitCard: (data: CardBody) => void
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
    reset,
    setValue,
  } = useForm<FormValuesAddCard>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(addCardSchema),
  })

  useEffect(() => {
    if (card) {
      setValue('answer', card.answer || '')
      setValue('question', card.question || '')
      setCurrentQuestionPhoto(card.questionImg ?? null)
      setCurrentAnswerPhoto(card.answerImg ?? null)
    }
  }, [card, setValue])

  const [currentQuestionPhoto, setCurrentQuestionPhoto] = useState<File | null | string>(null)

  const [currentAnswerPhoto, setCurrentAnswerPhoto] = useState<File | null | string>(null)

  const closeHandler = () => {
    onOpenChange(false)
  }

  const onSubmit = async (data: FormValuesAddCard) => {
    try {
      const cardData: CardBody = {
        ...data,
        answerImg: currentAnswerPhoto,
        questionImg: currentQuestionPhoto,
      }

      onSubmitCard(cardData)

      onOpenChange(false)
    } catch (error) {
      console.error('Error creating card:', error)
    }
    reset()
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

  const questionImageValidator = () => {
    if (currentQuestionPhoto instanceof File) {
      return URL.createObjectURL(currentQuestionPhoto)
    } else {
      return currentQuestionPhoto
    }
  }

  const answerImageValidator = () => {
    if (currentAnswerPhoto instanceof File) {
      return URL.createObjectURL(currentAnswerPhoto)
    } else {
      return currentAnswerPhoto
    }
  }

  return (
    <>
      <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} id={'hook-form'} onSubmit={handleSubmit(onSubmit)}>
          <CardSection
            control={control}
            disabled={isLoading}
            errors={errors}
            fileInputRef={fileQuestionInputRef}
            label={'Question'}
            name={'question'}
            openFileInput={openQuestionFileInput}
            setCurrentPhoto={setCurrentQuestionPhoto}
            uploadedImage={questionImageValidator()}
          />
          <CardSection
            control={control}
            disabled={isLoading}
            errors={errors}
            fileInputRef={fileAnswerInputRef}
            label={'Answer'}
            name={'answer'}
            openFileInput={openAnswerFileInput}
            setCurrentPhoto={setCurrentAnswerPhoto}
            uploadedImage={answerImageValidator()}
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
