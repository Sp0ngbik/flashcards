import { useMemo } from 'react'
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
import { useMeQuery } from '@/services/auth/auth.sevice'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
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
  const { data: me, isLoading: meIsLoading } = useMeQuery(undefined)
  const { data: minMaxValues } = useGetMinMaxCardsQuery(undefined)

  const [cardsTab, setCardsTab] = useSearchParams({
    currentTab: 'allCards',
  })

  const [search, setSearch] = useSearchParams({
    name: '',
    orderBy: '',
  })

  const [amountOfCards, setAmountOfCards] = useSearchParams({
    maxCardsCount: '15',
    minCardsCount: '',
  })

  const [paginationParam, setPaginationParam] = useSearchParams({
    currentPage: '1',
    itemsPerPage: '8',
  })

  const setDefaultSearchParams = (param: URLSearchParams, defaultValue: string) => {
    if (!param.get(defaultValue)) {
      param.set(defaultValue, JSON.stringify(''))
      setSearch(search)
    }
  }

  setDefaultSearchParams(search, 'orderBy')
  setDefaultSearchParams(search, 'name')
  setDefaultSearchParams(amountOfCards, 'minCardsCount')
  setDefaultSearchParams(paginationParam, 'currentPage')
  setDefaultSearchParams(paginationParam, 'itemsPerPage')
  setDefaultSearchParams(cardsTab, 'currentTab')

  const onTabValueChange = (value: string) => {
    cardsTab.set('currentTab', value)
    setCardsTab(cardsTab)
  }

  const getCurrentTab = cardsTab.get('currentTab')

  const setItemsPerPage = (value: number) => {
    paginationParam.set('itemsPerPage', JSON.stringify(value))
    setPaginationParam(paginationParam)
  }

  const defaultPaginationValue = 10
  const itemsPerPage = Number(JSON.parse(paginationParam.get('itemsPerPage') as string))

  const onChangeCurrentPage = (value: number) => {
    paginationParam.set('currentPage', JSON.stringify(value))
    setPaginationParam(paginationParam)
  }
  const currentPage = Number(JSON.parse(paginationParam.get('currentPage') as string))
  const debounceCurrentPage = useDebounce(currentPage, 1000)

  const onChangeSliderValues = (value: number[]) => {
    amountOfCards.set('minCardsCount', JSON.stringify(value[0]))
    setAmountOfCards(amountOfCards)
    amountOfCards.set('maxCardsCount', JSON.stringify(value[1]))
    setAmountOfCards(amountOfCards)
  }
  const minCards = Number(JSON.parse(amountOfCards.get('minCardsCount') as string))
  const maxCards = Number(JSON.parse(amountOfCards.get('maxCardsCount') as string))

  const debounceMinCards = useDebounce(minCards, 1000)
  const debounceMaxCards = useDebounce(maxCards, 1000)

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()
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

  const {
    data,
    error: deckError,
    isLoading: deckIsLoading,
  } = useGetDecksQuery({
    authorId: getCurrentTab === 'userCards' ? me?.id : undefined,
    currentPage: debounceCurrentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: debounceMaxCards,
    minCardsCount: debounceMinCards,
    name: debounceName,
    orderBy: sortedString,
  })

  if (deckIsLoading && meIsLoading) {
    return <div>Loading</div>
  }
  if (deckError) {
    return <div>{JSON.stringify(deckError)}</div>
  }
  const classNames = {
    icon: clsx(s.icon, isDeckBeingDeleted && s.disableIcon),
  }
  const tabs: TabType[] = [
    { title: 'My Cards', value: 'userCards' },
    { title: 'All Cards', value: 'allCards' },
  ]

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
            placeholder={'Input search'}
            value={nameBy}
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
            max={minMaxValues?.max}
            min={minMaxValues?.min}
          />
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
      <Pagination
        changeCurrentPage={onChangeCurrentPage}
        changeItemsPerPage={setItemsPerPage}
        className={s.paginationBlock}
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalCount={data?.pagination.totalItems ?? defaultPaginationValue}
      />
    </div>
  )
}

export default Decks
