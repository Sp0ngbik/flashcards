import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import noImageCover from '@/assets/image/noImage.png'
import { Button } from '@/common/ui/button'
import { DropdownMenu } from '@/common/ui/dropDownMenu'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'
import { CreateNewCard } from '@/features/cards/createNewCard/createNewCard'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useCardFilter } from '@/pages/cards/hooks/useCardFilter'
import { ErrorResponse } from '@/services/auth/auth.types'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'

import s from './cardHeader.module.scss'

const CardHeader = () => {
  const [deleteDeck] = useDeleteDeckMutation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isDeleteForm, setDeleteForm] = useState(false)
  const backDeck = sessionStorage.getItem('lastLocation')
  const {
    getDeckById,
    isEmpty,
    isOpen,
    isOpenEdit,
    isOwner,
    onChangeName,
    searchBy,
    setIsOpen,
    setIsOpenEdit,
  } = useCardFilter(id)
  const onCloseDeleteForm = () => {
    setDeleteForm(false)
  }
  const learnDeckHandler = () => {
    navigate(`/cards/${id}/learn`)
  }
  const onEditClickHandler = () => {
    setIsOpenEdit(true)
  }
  const onOpenDeleteForm = () => {
    setDeleteForm(true)
  }
  const onAddNewCardHandler = () => {
    setIsOpen(true)
  }
  const onDeleteDeck = async (id: string) => {
    try {
      if (id) {
        await toast.promise(deleteDeck(id).unwrap(), { pending: 'In progress', success: 'Success' })
        navigate(`${backDeck}`)
      }
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? "Deck Couldn't Delete")
    }
  }

  return (
    <div>
      <UpdateDeck
        deck={getDeckById}
        isOpen={isOpenEdit}
        onOpenChange={setIsOpenEdit}
        title={'Update Deck'}
      />
      <CreateNewCard id={id} isOpen={isOpen} onOpenChange={setIsOpen} title={'Add New Card'} />
      <DeleteForm
        cancel={onCloseDeleteForm}
        deleteCB={onDeleteDeck}
        id={id}
        isDeck
        isOpen={isDeleteForm}
        name={getDeckById?.name}
        onOpenChange={setDeleteForm}
        title={'Delete Pack'}
      />
      <NavLink className={s.backToDeck} to={`${backDeck}`}>
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </NavLink>
      <div className={s.cardsHeader}>
        <div>
          <div className={s.dropDownDiv}>
            <Typography variant={'h1'}>{getDeckById?.name}</Typography>
            {isOwner && (
              <DropdownMenu
                flag={'editCard'}
                learnDeck={learnDeckHandler}
                onEditClick={onEditClickHandler}
                onOpenDeleteForm={onOpenDeleteForm}
              />
            )}
          </div>
          {getDeckById?.cover ? (
            <img alt={''} className={s.tableImage} src={getDeckById.cover} />
          ) : (
            <img alt={''} className={s.tableImage} src={noImageCover} />
          )}
        </div>
        {isOwner && !isEmpty && (
          <Button onClick={onAddNewCardHandler} variant={'primary'}>
            Add New Card
          </Button>
        )}
        {!isOwner && (
          <Button onClick={learnDeckHandler} variant={'primary'}>
            Learn to Pack
          </Button>
        )}
      </div>
      {!isEmpty && (
        <TextField
          label={'Search'}
          onValueChange={onChangeName}
          placeholder={'Input search'}
          value={searchBy}
          variant={'search'}
        />
      )}
      {isEmpty && isOwner && (
        <div className={s.addCardDown}>
          <Typography className={s.emptyTypography} variant={'subtitle1'}>
            This pack is empty. Click add new card to fill this pack{' '}
          </Typography>
          <Button onClick={onAddNewCardHandler} variant={'primary'}>
            Add New Card
          </Button>
        </div>
      )}
    </div>
  )
}

export default CardHeader
