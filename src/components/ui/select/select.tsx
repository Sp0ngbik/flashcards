import { ComponentPropsWithoutRef, useState } from 'react'

import { ArrowDown, ArrowUp } from '@/assets'
import { SelectItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = {
  defaultOpen?: boolean
  disabled?: boolean
  label?: string
  options: string[]
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = ({
  disabled = false,
  label = 'Select box',
  options = [],
  ...props
}: Props) => {
  const [state, setState] = useState(false)

  return (
    <div className={s.selectWrapper}>
      <Typography
        className={`${s.selectLabel} ${disabled && s.selectLabelDisabled}`}
        variant={'body2'}
      >
        {label}
      </Typography>
      <SelectRadix.Root disabled={disabled} onOpenChange={open => setState(open)} {...props}>
        <SelectRadix.Trigger className={s.selectTrigger}>
          <SelectRadix.Value placeholder={options[0]} />
          <SelectRadix.Icon asChild>
            {state ? <ArrowUp className={s.arrow} /> : <ArrowDown className={s.arrow} />}
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            align={'start'}
            className={s.selectContent}
            position={'popper'}
            sticky={'partial'}
          >
            <SelectRadix.Viewport className={s.selectViewport}>
              <SelectRadix.Group className={s.selectGroup}>
                {options.map((el, index) => (
                  <SelectItem className={s.selectItem} key={index} value={el} />
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}