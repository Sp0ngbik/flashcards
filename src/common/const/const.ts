import { TabType } from '@/common/ui/tabSwitcher'

export const deckColumns = [
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

export const cardColumns = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'updated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
  { key: 'icons', title: '' },
]

export const tabs: TabType[] = [
  { title: 'My Cards', value: 'userCards' },
  { title: 'All Cards', value: 'allCards' },
]
