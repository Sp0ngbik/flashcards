import { toast } from 'react-toastify'

import DeckForm from '@/features/deck/deckForm/deckForm'
import { useCreateDeckMutation } from '@/services/decks/decks.service'

type AddNewDeckModalProps = {
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const CreateNewDeck = ({ isOpen, onOpenChange, title }: AddNewDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()
  const onSubmitHandler = async (data: FormData) => {
    await toast.promise(createDeck(data).unwrap(), {
      error: 'Failed to add new Deck',
      pending: 'In progress',
      success: 'Added',
    })
  }

  return (
    <DeckForm
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitDeck={onSubmitHandler}
      title={title}
    />
  )
}
