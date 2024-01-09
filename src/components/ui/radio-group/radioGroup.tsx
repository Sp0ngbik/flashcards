import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  className?: string
  defaultChecked?: boolean
  disabled?: boolean
  options: string[]
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>

export const RadioGroupDemo = forwardRef<HTMLButtonElement, Props>((props, forwardRef) => {
  const { options } = props

  return (
    <form>
      <RadioGroup.Root className={s.radioGroupRoot} {...props} defaultValue={options[0]}>
        {props.options.map((el, index) => (
          <div className={s.radioButtonBlock} key={index}>
            <RadioGroup.Item
              className={s.radioGroupItem}
              id={'r' + index}
              ref={forwardRef}
              value={el}
            >
              <RadioGroup.Indicator className={s.radioGroupIndicator} />
            </RadioGroup.Item>
            <Typography className={s.label} htmlFor={'r' + index} variant={'body2'}>
              {el}
            </Typography>
          </div>
        ))}
      </RadioGroup.Root>
    </form>
  )
})
