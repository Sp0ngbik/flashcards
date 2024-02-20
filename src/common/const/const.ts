import { TabType } from '@/common/ui/tabSwitcher'

export const deckColumns = [
  { key: 'name', ownerValidate: false, sortable: true, title: 'Name' },
  {
    key: 'cardsCount',
    ownerValidate: false,
    sortable: true,
    title: 'Cards',
  },
  { key: 'updated', ownerValidate: false, sortable: true, title: 'Last Updated' },
  { key: 'author.name', ownerValidate: false, sortable: true, title: 'Created by' },
  {
    key: '',
    ownerValidate: false,
    sortable: false,
    title: '',
  },
]

export const cardColumns = [
  { key: 'question', ownerValidate: false, sortable: true, title: 'Question' },
  { key: 'answer', ownerValidate: false, sortable: true, title: 'Answer' },
  { key: 'updated', ownerValidate: false, sortable: true, title: 'Last Updated' },
  { key: 'grade', ownerValidate: false, sortable: true, title: 'Grade' },
  { key: 'icons', ownerValidate: true, sortable: false, title: '' },
]

export const tabs: TabType[] = [
  { title: 'My Cards', value: 'userCards' },
  { title: 'All Cards', value: 'allCards' },
]
