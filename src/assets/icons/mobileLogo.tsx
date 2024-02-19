import { HTMLAttributes } from 'react'

type SvgWithColor = {
  className?: string
} & HTMLAttributes<SVGElement>

export const MobileLogo = ({ className }: SvgWithColor) => {
  return (
    <svg
      className={className}
      fill={'none'}
      height={'36.000000'}
      viewBox={'0 0 36 36'}
      width={'36.000000'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        className={className}
        d={
          'M18 34.5C27.1127 34.5 34.5 27.1127 34.5 18C34.5 8.8873 27.1127 1.5 18 1.5C8.88733 1.5 1.5 8.8873 1.5 18C1.5 27.1127 8.88733 34.5 18 34.5ZM18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.0589 0 0 8.05887 0 18C0 27.9411 8.0589 36 18 36Z'
        }
        fill={'#FFFFFF'}
        fillOpacity={'1.000000'}
        fillRule={'evenodd'}
        id={'Ellipse 2 (Stroke)'}
      />
      <path
        className={className}
        d={
          'M10.5092 6.53497C11.5917 6.53497 12.4695 7.41278 12.4695 8.49536C12.4695 9.57797 11.5917 10.4557 10.5092 10.4557C9.42657 10.4557 8.54877 9.57797 8.54877 8.49536C8.54877 7.41278 9.42657 6.53497 10.5092 6.53497Z'
        }
        fill={'#F23D61'}
        fillOpacity={'1.000000'}
        fillRule={'evenodd'}
        id={'path4'}
      />
      <path
        className={className}
        d={
          'M12.1799 11.8784L9.26343 11.8784L9.26343 24.4724L12.1799 24.4724L12.1799 11.8784ZM26.7288 24.4724L26.7288 11.8784L23.8483 11.8784L23.8483 19.5247L17.5831 11.8784L15.1707 11.8784L15.1707 24.4724L18.0512 24.4724L18.0512 16.826L24.3344 24.4724L26.7288 24.4724Z'
        }
        fill={'#FFFFFF'}
        fillOpacity={'1.000000'}
        fillRule={'evenodd'}
        id={'IN'}
      />
    </svg>
  )
}
