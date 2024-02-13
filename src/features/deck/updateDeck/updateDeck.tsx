import { toast } from 'react-toastify'

import DeckForm, { EditDeckType } from '@/features/deck/deckForm/deckForm'
import { ErrorResponse } from '@/services/auth/auth.types'
import { useUpdateDeckMutation } from '@/services/decks/decks.service'

type UpdateDeckProps = {
  deck?: EditDeckType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const UpdateDeck = ({ deck, isOpen, onOpenChange, title }: UpdateDeckProps) => {
  const [updateDeck, { isLoading }] = useUpdateDeckMutation()
  const updateEditDeck = async (data: FormData) => {
    try {
      if (deck?.id) {
        await toast.promise(updateDeck({ data, id: deck?.id }).unwrap(), {
          pending: 'In progress',
          success: 'Success',
        })
      }
    } catch (e) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? 'Could not update')
    }
  }

  return (
    <DeckForm
      deck={deck}
      disabled={isLoading}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitDeck={updateEditDeck}
      title={title}
    />
  )
}
