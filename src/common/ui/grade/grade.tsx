import ReactStars from 'react-rating-star-with-type'

import s from './grade.module.scss'
type GradeProps = {
  count: number
}
export const Grade = ({ count }: GradeProps) => {
  return (
    <ReactStars
      classNames={s.stars}
      isEdit={false}
      isHalf={false}
      onChange={() => {}}
      size={16}
      value={count}
    />
  )
}
