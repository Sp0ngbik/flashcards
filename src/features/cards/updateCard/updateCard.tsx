import { CardForm, EditCardType } from '@/features/cards/cardForm/cardForm'
import { useUpdateCardMutation } from '@/services/cards/cards.service'

type UpdateCardModalProps = {
  card?: EditCardType
  id?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}
export const UpdateCard = ({ card, id, isOpen, onOpenChange, title }: UpdateCardModalProps) => {
  const [updateCard] = useUpdateCardMutation()

  const updateCurrentCard = (body: FormData) => {
    id && updateCard({ body, id })
  }

  return (
    <CardForm
      card={card}
      id={id}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitCard={updateCurrentCard}
      title={title}
    />
  )
}
