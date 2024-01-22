import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Delete, Edit, Play } from '@/assets'
import { useDebounce } from '@/components/decs/hooks/useDebounce'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { DoubleSlider } from '@/components/ui/slider'
import { TabSwitcher, TabType } from '@/components/ui/tabSwitcher'
import { Sort } from '@/components/ui/table/table.stories'
import { Table, TableBody, TableDataCell, TableRow } from '@/components/ui/table/tableConstuctor'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'
import TextField from '@/components/ui/textField/textField'
import { Typography } from '@/components/ui/typography'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '@/services/decks/decks.service.'
import { clsx } from 'clsx'

import s from './decks.module.scss'

const columns = [
  { key: 'name', sortable: true, title: 'Name' },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'CardsCount',
  },
  { key: 'updated', sortable: true, title: 'Last Updated' },
  { key: 'author.name', sortable: true, title: 'Created by' },
  {
    key: '',
    sortable: true,
    title: '',
  },
]

const Decks = () => {
  const [search, setSearch] = useSearchParams({ name: '', orderBy: '' })
  const setDefaultSearchParams = () => {
    if (!search.get('orderBy')) {
      const defaultValue = ''

      search.set('orderBy', JSON.stringify(defaultValue))
      setSearch(search)
    }

    if (!search.get('name')) {
      const defaultValue = ''

      search.set('name', JSON.stringify(defaultValue))
      setSearch(search)
    }
  }

  setDefaultSearchParams()

  const [currentValue, setCurrentValue] = useState<number[]>([0, 50])

  const orderBy = JSON.parse(search.get('orderBy') as string)
  const nameBy = JSON.parse(search.get('name') as string)
  const debounceName = useDebounce(nameBy, 2000)

  const setSortedBy = (value: Sort) => {
    search.set('orderBy', JSON.stringify(value))
    setSearch(search)
  }

  const onChangeName = (value: string) => {
    search.set('name', JSON.stringify(value))
    setSearch(search)
  }

  const onCreateDeck = () => {
    createDeck({ name: 'deck check' })
  }

  const sortedString = useMemo(() => {
    if (!orderBy) {
      return null
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { data, error, isLoading } = useGetDecksQuery({
    name: debounceName,
    orderBy: sortedString,
  })

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (isLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  const classNames = {
    icon: clsx(s.icon, isDeckBeingDeleted && s.disableIcon),
  }
  const tabs: TabType[] = [
    { title: 'My Cards', value: 'My cards' },
    { title: 'All Cards', value: 'All Cards' },
  ]

  console.log(data)

  return (
    <div className={s.deckWrapper}>
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks List</Typography>
        <Button disabled={isDeckBeingCreated} onClick={onCreateDeck}>
          Add New Deck
        </Button>
      </div>
      <div className={s.deckFilter}>
        <div>
          <TextField
            label={'Search'}
            onValueChange={onChangeName}
            value={nameBy}
            variant={'search'}
          />
        </div>
        <TabSwitcher label={'Show decks cards'} tabs={tabs} />
        <div>
          <Typography className={s.sliderLabel} variant={'body2'}>
            Number of cards
          </Typography>
          <DoubleSlider changeSliderValue={setCurrentValue} defaultValue={currentValue} max={65} />
        </div>
        <Button icon={<Delete />} variant={'secondary'}>
          Clear Filter
        </Button>
      </div>
      <Table>
        <TableHeader columns={columns} onSort={setSortedBy} sort={orderBy} />
        <TableBody>
          {data?.items?.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableDataCell>{deck.name}</TableDataCell>
                <TableDataCell>{deck.cardsCount}</TableDataCell>
                <TableDataCell>{new Date(deck.updated).toLocaleDateString('ru-RU')}</TableDataCell>
                <TableDataCell>{deck.author.name}</TableDataCell>
                <TableDataCell>
                  <Play className={s.icon} />
                  <Edit className={s.icon} />
                  <Delete
                    className={classNames.icon}
                    onClick={() => {
                      deleteDeck({ id: deck.id })
                    }}
                  />
                </TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination className={s.paginationBlock} totalCount={data?.pagination.totalItems ?? 10} />
    </div>
  )
}

export default Decks
