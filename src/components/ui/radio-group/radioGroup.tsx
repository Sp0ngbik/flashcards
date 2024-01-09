import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  className?: string
  defaultChecked?: boolean
  disabled?: boolean
  options: string[]
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>

export const RadioGroupDemo = ({ options = [], ...props }: Props) => {
  return (
    <form>
      <RadioGroup.Root className={s.radioGroupRoot} {...props} defaultValue={options[0]}>
        {options.map((el, index) => (
          <div className={s.radioButtonBlock} key={'asdasd' + index}>
            {options[0]}
            <RadioGroup.Item
              className={s.radioGroupItem}
              id={index.toString()}
              value={index.toString()}
            >
              <RadioGroup.Indicator className={s.radioGroupIndicator} />
            </RadioGroup.Item>
            <label className={s.label} htmlFor={index.toString()}>
              {el}
            </label>
          </div>
        ))}
        {/*<div className={s.radioButtonBlock}>*/}
        {/*  <RadioGroup.Item className={s.radioGroupItem} id={'r1'} value={'default'}>*/}
        {/*    <RadioGroup.Indicator className={s.radioGroupIndicator} />*/}
        {/*  </RadioGroup.Item>*/}
        {/*  <label className={s.label} htmlFor={'r1'}>*/}
        {/*    Default*/}
        {/*  </label>*/}
        {/*</div>*/}
        {/*<div className={s.radioButtonBlock}>*/}
        {/*  <RadioGroup.Item className={s.radioGroupItem} id={'r2'} value={'comfortable'}>*/}
        {/*    <RadioGroup.Indicator className={s.radioGroupIndicator} />*/}
        {/*  </RadioGroup.Item>*/}
        {/*  <label className={s.label} htmlFor={'r2'}>*/}
        {/*    Comfortable*/}
        {/*  </label>*/}
        {/*</div>*/}
        {/*<div className={s.radioButtonBlock}>*/}
        {/*  <RadioGroup.Item className={s.radioGroupItem} id={'r3'} value={'compact'}>*/}
        {/*    <RadioGroup.Indicator className={s.radioGroupIndicator} />*/}
        {/*  </RadioGroup.Item>*/}
        {/*  <label className={s.label} htmlFor={'r3'}>*/}
        {/*    Compact*/}
        {/*  </label>*/}
        {/*</div>*/}
      </RadioGroup.Root>
    </form>
  )
}
