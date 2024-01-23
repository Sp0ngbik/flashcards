import { Typography } from '@/components/ui/typography'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

export type TabType = {
  className?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
  title?: string
  value?: string
}

type TabsProps = {
  label?: string
  tabs: TabType[]
}

export const TabSwitcher = (props: TabsProps) => {
  const { label, tabs } = props

  return (
    <div>
      <TabsRadix.Root className={s.TabsRoot} defaultValue={tabs[0]?.value ? 'tab1' : 'tab2'}>
        <Typography className={s.tabsLabel} variant={'body2'}>
          {label}
        </Typography>
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
    </div>
  )
}
