import { useState } from 'react'

import { Delete } from '@/assets'
import { tabs } from '@/common/const'
import { Button } from '@/common/ui/button'
import { DoubleSlider } from '@/common/ui/slider'
import { TabSwitcher } from '@/common/ui/tabSwitcher'
import TextField from '@/common/ui/textField/textField'
import { Typography } from '@/common/ui/typography'
import { CreateNewDeck } from '@/features/deck/createNewDeck'
import { useDeckFilter } from '@/pages/decs/hooks/useDeckFIlter'

import s from './deckHeader.module.scss'

const DeckHeader = () => {
  const {
    clearFilter,
    deckIsFetching,
    getCurrentTab,
    maxCards,
    minCards,
    minMaxValues,
    onChangeName,
    onCommitSliderValues,
    onTabValueChange,
    searchBy,
  } = useDeckFilter()

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const onCreateDeck = () => {
    setIsCreateOpen(true)
  }

  return (
    <>
      <CreateNewDeck isOpen={isCreateOpen} onOpenChange={setIsCreateOpen} title={'Add New Deck'} />
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks List</Typography>
        <Button onClick={onCreateDeck}>Add New Deck</Button>
      </div>
      <div className={s.deckFilter}>
        <div className={s.searchFieldWrapper}>
          <TextField
            className={s.searchInput}
            label={'Search'}
            onValueChange={onChangeName}
            placeholder={'Search deck'}
            value={searchBy}
            variant={'search'}
          />
        </div>
        <div className={s.deckFilterGroup}>
          <TabSwitcher
            disabled={deckIsFetching}
            label={'Show decks cards'}
            onValueChange={onTabValueChange}
            tabs={tabs}
            value={getCurrentTab || tabs[0].value}
          />
          <div>
            <Typography className={s.sliderLabel} variant={'body2'}>
              Number of cards
            </Typography>
            <DoubleSlider
              defaultValue={[minCards, maxCards]}
              max={minMaxValues?.max}
              min={minMaxValues?.min}
              onValueCommit={onCommitSliderValues}
            />
          </div>
          <Button
            icon={<Delete className={s.deleteIcon} />}
            onClick={clearFilter}
            variant={'secondary'}
          >
            Clear Filter
          </Button>
        </div>
      </div>
    </>
  )
}

export default DeckHeader
