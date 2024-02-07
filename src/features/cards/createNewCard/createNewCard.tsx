import { toast } from 'react-toastify'

import { CardForm } from '@/features/cards/cardForm/cardForm'
import { useCreateCardMutation } from '@/services/cards/cards.service'

type AddNewDeckModalProps = {
  id?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}
export const CreateNewCard = ({ id, isOpen, onOpenChange, title }: AddNewDeckModalProps) => {
  const [createCard, { isLoading }] = useCreateCardMutation()

  const onSubmitHandler = async (data: FormData) => {
    id &&
      (await toast.promise(createCard({ data, id }).unwrap(), {
        error: 'Failed to add new Deck',
        pending: 'In progress',
        success: 'Added',
      }))
  }

  return (
    <CardForm
      id={id}
      isLoading={isLoading}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitCard={onSubmitHandler}
      title={title}
    />
  )
}
