import ReactStars from 'react-stars'

type GradeProps = {
  count: number
}
export const Grade = ({ count }: GradeProps) => {
  return <ReactStars edit={false} half={false} onChange={() => {}} size={24} value={count} />
}
