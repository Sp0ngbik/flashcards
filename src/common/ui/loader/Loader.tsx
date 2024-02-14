import { clsx } from 'clsx'

import s from './loader.module.scss'

type LoaderProps = {
  smallVersion?: boolean
  transparentBackground?: boolean
}

export const Loader = ({ smallVersion, transparentBackground }: LoaderProps) => {
  const classNames = {
    loader: clsx(smallVersion ? '' : s.loader),
    loaderWrapper: clsx(
      smallVersion ? '' : s.loaderWrapper,
      transparentBackground && s.transparentBackground
    ),
  }

  return (
    <div className={classNames.loaderWrapper}>
      <svg
        className={classNames.loader}
        height={smallVersion ? '100%' : '244px'}
        preserveAspectRatio={'xMidYMid'}
        viewBox={'0 0 100 100'}
        width={smallVersion ? '100%' : '244px'}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <path d={'M6 50A44 44 0 0 0 94 50A44 45.2 0 0 1 6 50'} fill={'#8c61ff'} stroke={'none'}>
          <animateTransform
            attributeName={'transform'}
            dur={'0.819672131147541s'}
            keyTimes={'0;1'}
            repeatCount={'indefinite'}
            type={'rotate'}
            values={'0 50 50.6;360 50 50.6'}
          ></animateTransform>
        </path>
      </svg>
    </div>
  )
}
