import DeckForm from '@/features/deck/deckForm/deckForm'
import { useCreateDeckMutation } from '@/services/decks/decks.service.'

type AddNewDeckModalProps = {
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const CreateNewDeck = ({ isOpen, onOpenChange, title }: AddNewDeckModalProps) => {
  const [createDeck] = useCreateDeckMutation()

  return (
    <DeckForm isOpen={isOpen} onOpenChange={onOpenChange} onSubmitDeck={createDeck} title={title} />
  )
}
