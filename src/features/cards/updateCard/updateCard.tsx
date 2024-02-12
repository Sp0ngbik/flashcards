import { toast } from 'react-toastify'

import { CardForm, EditCardType } from '@/features/cards/cardForm/cardForm'
import { ErrorResponse } from '@/services/auth/auth.types'
import { useUpdateCardMutation } from '@/services/cards/cards.service'

type UpdateCardModalProps = {
  card?: EditCardType
  id?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}
export const UpdateCard = ({ card, id, isOpen, onOpenChange, title }: UpdateCardModalProps) => {
  const [updateCard, { isLoading }] = useUpdateCardMutation()

  const updateCurrentCard = async (body: FormData) => {
    try {
      if (id) {
        await toast.promise(updateCard({ body, id }).unwrap(), {
          pending: 'In progress',
          success: 'Success',
        })
      }
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? 'Could not update')
    }
  }

  return (
    <CardForm
      card={card}
      id={id}
      isLoading={isLoading}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitCard={updateCurrentCard}
      title={title}
    />
  )
}
