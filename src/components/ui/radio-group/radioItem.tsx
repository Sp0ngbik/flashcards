import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from '@/components/ui/radio-group/radioGroup.module.scss'

type Props = ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>

export const RadioItem = (props: Props) => {
  const { children, value } = props

  return (
    <div className={s.radioItemBlock}>
      <RadioGroupRadix.Item className={s.radioGroupItem} id={'id' + value} value={value}>
        <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
      </RadioGroupRadix.Item>
      <Typography as={'label'} className={s.label} htmlFor={value} variant={'body2'}>
        {children}
      </Typography>
    </div>
  )
}
