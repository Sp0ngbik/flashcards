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
    onChangeSliderValues,
    onTabValueChange,
    searchBy,
  } = useDeckFilter()

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const onCreateDeck = () => {
    setIsCreateOpen(true)
  }

  return (
    <div>
      <CreateNewDeck isOpen={isCreateOpen} onOpenChange={setIsCreateOpen} title={'Add New Deck'} />
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks List</Typography>
        <Button onClick={onCreateDeck}>Add New Deck</Button>
      </div>
      <div className={s.deckFilter}>
        <div>
          <TextField
            label={'Search'}
            onValueChange={onChangeName}
            placeholder={'Input search'}
            value={searchBy}
            variant={'search'}
          />
        </div>
        <TabSwitcher
          defaultValue={getCurrentTab || tabs[0].value}
          label={'Show decks cards'}
          onValueChange={onTabValueChange}
          tabs={tabs}
        />
        <div>
          <Typography className={s.sliderLabel} variant={'body2'}>
            Number of cards
          </Typography>
          <DoubleSlider
            changeSliderValue={onChangeSliderValues}
            defaultValue={[minCards, maxCards]}
            disabled={deckIsFetching}
            max={minMaxValues?.max}
            min={minMaxValues?.min}
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
  )
}

export default DeckHeader
