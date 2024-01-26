import { ComponentPropsWithoutRef, useId } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from '@/components/ui/radio-group/radioGroup.module.scss'

type Props = ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>

export const RadioItem = (props: Props) => {
  const { children, id, value } = props
  const generatedId = useId()

  return (
    <div className={s.radioItemBlock}>
      <RadioGroupRadix.Item className={s.radioGroupItem} id={id ?? generatedId} value={value}>
        <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
      </RadioGroupRadix.Item>
      <Typography as={'label'} className={s.label} htmlFor={id ?? generatedId} variant={'body2'}>
        {children}
      </Typography>
    </div>
  )
}
