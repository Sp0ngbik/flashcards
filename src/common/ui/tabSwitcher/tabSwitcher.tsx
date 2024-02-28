import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/common/ui/typography'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

export type TabType = {
  className?: string
  title?: string
  value?: string
}

type TabsProps = {
  disabled?: boolean
  label?: string
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const TabSwitcher = (props: TabsProps) => {
  const { disabled, label, tabs } = props

  return (
    <div>
      <TabsRadix.Root className={s.tabsRoot} {...props}>
        <Typography className={s.tabsLabel} variant={'body2'}>
          {label}
        </Typography>
        <TabsRadix.List aria-label={'Manage your account'} className={s.tabsList}>
          {tabs.map((tab, index) => {
            return (
              <TabsRadix.Trigger
                className={s.tabsTrigger}
                disabled={disabled}
                key={index}
                value={`${tab.value}`}
              >
                <Typography className={s.tabsTitle} variant={'body1'}>
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
