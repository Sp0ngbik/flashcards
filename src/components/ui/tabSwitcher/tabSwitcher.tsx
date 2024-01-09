import { Typography } from '@/components/ui/typography'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

type TabType = {
  className?: string
  disabled?: boolean
  title?: string
  value?: string
}

export type TabsProps = {
  tabs: TabType[]
}

export const TabSwitcher = (props: TabsProps) => {
  const { tabs } = props

  return (
    <TabsRadix.Root className={s.TabsRoot} defaultValue={tabs[0]?.value ? 'tab1' : 'tab2'}>
      <TabsRadix.List aria-label={'Manage your account'} className={s.TabsList}>
        {tabs.map((tab, index) => {
          return (
            <TabsRadix.Trigger
              className={s.TabsTrigger}
              disabled={tab.disabled}
              key={index}
              value={`tab${index + 1}`}
            >
              <Typography className={s.TabsTitle} variant={'body1'}>
                {tab.title}
              </Typography>
            </TabsRadix.Trigger>
          )
        })}
      </TabsRadix.List>
    </TabsRadix.Root>
  )
}
