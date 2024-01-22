import { useMemo, useState } from 'react'

import { Delete, Edit, Play } from '@/assets'
import { Button } from '@/components/ui/button'
import { DoubleSlider } from '@/components/ui/slider'
import { Sort } from '@/components/ui/table/table.stories'
import { Table, TableBody, TableDataCell, TableRow } from '@/components/ui/table/tableConstuctor'
import { TableHeader } from '@/components/ui/table/tableHeader/tableHeader'
import TextField from '@/components/ui/textField/textField'
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
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState<Sort | null>(null)
  const [currentValue, setCurrentValue] = useState<number[]>([0, 50])

  const sortedString = useMemo(() => {
    if (!orderBy) {
      return null
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { data, error, isLoading } = useGetDecksQuery({
    name: search,
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        margin: '0 auto',
        maxWidth: 1280,
        padding: '24px 137px',
      }}
    >
      <TextField label={'Search'} onValueChange={setSearch} value={search} variant={'search'} />
      <DoubleSlider changeSliderValue={setCurrentValue} defaultValue={currentValue} max={65} />
      <Button
        disabled={isDeckBeingCreated}
        onClick={() => {
          createDeck({ name: 'deck check' })
        }}
      >
        Create Deck
      </Button>
      <Table>
        <TableHeader columns={columns} onSort={setOrderBy} sort={orderBy} />
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
    </div>
  )
}

export default Decks
