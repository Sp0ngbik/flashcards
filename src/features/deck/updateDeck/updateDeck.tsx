import DeckForm, { EditDeckType } from '@/features/deck/deckForm/deckForm'
import { useUpdateDeckMutation } from '@/services/decks/decks.service'

type UpdateDeckProps = {
  deck?: EditDeckType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const UpdateDeck = ({ deck, isOpen, onOpenChange, title }: UpdateDeckProps) => {
  const [updateDeck] = useUpdateDeckMutation()
  const updateEditDeck = (data: FormData) => {
    deck?.id && updateDeck({ data, id: deck?.id })
  }

  return (
    <DeckForm
      deck={deck}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitDeck={updateEditDeck}
      title={title}
    />
  )
}
