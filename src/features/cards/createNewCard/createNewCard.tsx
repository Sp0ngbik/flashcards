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

  const createNewCard = (data: FormData) => {
    id && createCard({ data, id })
  }

  return (
    <CardForm
      id={id}
      isLoading={isLoading}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitCard={createNewCard}
      title={title}
    />
  )
}
