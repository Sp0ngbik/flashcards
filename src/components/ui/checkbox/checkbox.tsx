import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export default () => (
  <div style={{ alignItems: 'center', display: 'flex' }}>
    <Checkbox.Root className={s.CheckboxRoot} defaultChecked id={'c1'}>
      <Checkbox.Indicator className={s.CheckboxIndicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label className={s.Label} htmlFor={'c1'}>
      Accept terms and conditions.
    </label>
  </div>
)

// import s from '@/components/ui/checkbox/checkbox.module.scss'
//
// export type CheckboxProps = {
//   className?: string
//   text?: string
//   variant?: 'checkbox' | 'withLabel'
// }
//
// export const Checkbox = (props: CheckboxProps) => {
//   const { className, text, variant = 'checkbox', ...rest } = props
//
//   return (
//     <label>
//       <input className={`${s.checkbox} ${s[variant]} ${className}`} type={'checkbox'} {...rest} />
//       <span></span>
//       {variant === 'withLabel' && <p>Im checkbox label</p>}
//     </label>
//   )
// }
