import { HTMLAttributes } from 'react'

type SvgWithColor = {
  className?: string
} & HTMLAttributes<SVGElement>

export const Trash = ({ className, ...props }: SvgWithColor) => {
  return (
    <svg
      className={className}
      fill={'none'}
      height={'24'}
      viewBox={'0 0 24 24'}
      width={'24'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <defs>
        <clipPath id={'clip5661_1775'}>
          <rect
            fill={'white'}
            fillOpacity={'0'}
            height={'24.000000'}
            id={'trash-outline'}
            width={'24.000000'}
          />
        </clipPath>
      </defs>
      <rect
        className={className}
        fill={'#FFFFFF'}
        fillOpacity={'0'}
        height={'24.000000'}
        id={'trash-outline'}
        width={'24.000000'}
      />
      <g clipPath={'url(#clip5661_1775)'}>
        <g opacity={'0.000000'}>
          <path
            className={className}
            d={'M0 0L24 0L24 24L0 24L0 0Z'}
            fill={'#000000'}
            fillOpacity={'1.000000'}
            fillRule={'evenodd'}
            id={'Vector'}
          />
        </g>
        <path
          className={className}
          d={
            'M21 6L16 6L16 4.33001C15.9765 3.68982 15.7002 3.08506 15.2316 2.6483C14.7629 2.21153 14.1402 1.9784 13.5 2L10.5 2C9.85976 1.9784 9.23706 2.21153 8.76843 2.6483C8.29979 3.08506 8.02345 3.68982 8 4.33001L8 6L3 6C2.73479 6 2.48042 6.10536 2.29289 6.2929C2.10536 6.48043 2 6.73479 2 7C2 7.26522 2.10536 7.51958 2.29289 7.70711C2.48042 7.89465 2.73479 8 3 8L4 8L4 19C4 19.7957 4.31607 20.5587 4.87868 21.1213C5.44128 21.6839 6.20435 22 7 22L17 22C17.7957 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7957 20 19L20 8L21 8C21.2652 8 21.5196 7.89465 21.7071 7.70711C21.8946 7.51958 22 7.26522 22 7C22 6.73479 21.8946 6.48043 21.7071 6.2929C21.5196 6.10536 21.2652 6 21 6ZM10 4.33001C10 4.17001 10.21 4 10.5 4L13.5 4C13.79 4 14 4.17001 14 4.33001L14 6L10 6L10 4.33001ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20L7 20C6.73479 20 6.48042 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19L6 8L18 8L18 19Z'
          }
          fill={'#000000'}
          fillOpacity={'1.000000'}
          fillRule={'nonzero'}
          id={'Vector'}
        />
      </g>
    </svg>
  )
}
