import { Typography } from '@/components/ui/typography'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

export type TabType = {
  className?: string
  disabled?: boolean
  title?: string
  value?: string
}

type TabsProps = {
  label?: string
  onValueChange?: (value: string) => void
  tabs: TabType[]
}

export const TabSwitcher = (props: TabsProps) => {
  const { label, onValueChange, tabs } = props

  return (
    <div>
      <TabsRadix.Root
        className={s.TabsRoot}
        defaultValue={tabs[0].value}
        onValueChange={onValueChange}
      >
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
                value={`${tab.value}`}
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
