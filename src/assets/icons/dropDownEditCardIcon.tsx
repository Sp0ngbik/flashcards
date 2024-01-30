import { HTMLAttributes } from 'react'

type SvgWithColor = {
  className?: string
} & HTMLAttributes<SVGElement>
export const DropDownEditCardIcon = ({ className }: SvgWithColor) => {
  return (
    <svg
      className={className}
      fill={'none'}
      height={'12'}
      viewBox={'0 0 12 12'}
      width={'12'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <path
        d={
          'M6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7Z'
        }
        fill={'white'}
      />
      <path
        d={
          'M6 3.5C6.55228 3.5 7 3.05228 7 2.5C7 1.94772 6.55228 1.5 6 1.5C5.44772 1.5 5 1.94772 5 2.5C5 3.05228 5.44772 3.5 6 3.5Z'
        }
        fill={'white'}
      />
      <path
        d={
          'M6 10.5C6.55228 10.5 7 10.0523 7 9.5C7 8.94772 6.55228 8.5 6 8.5C5.44772 8.5 5 8.94772 5 9.5C5 10.0523 5.44772 10.5 6 10.5Z'
        }
        fill={'white'}
      />
    </svg>
  )
}
