import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { RadioGroup } from '@/common/ui/radio-group'
import { RadioItem } from '@/common/ui/radio-group/radioItem'
import { Typography } from '@/common/ui/typography'
import { useLearnCardQuery, usePostCardMutation } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service.'

import s from './learn.module.scss'

const Learn = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useLearnCardQuery({ id })
  const { data: getCardByIdData } = useGetDeckByIdQuery({ id })
  const [post] = usePostCardMutation()
  const [answer, showAnswer] = useState<boolean>(false)

  //console.log(data)
  //console.log(getCardByIdData)
  const showAnswerHandler = () => {
    showAnswer(true)
  }
  const cardId = data?.id || ''

  const prevGrade = data?.grade.toString() || '1'

  console.log(prevGrade)

  const [grade, setGrade] = useState<string>(prevGrade)
  const nextQuestion = async () => {
    await post({ cardId, grade: Number(grade) }).unwrap()
    setGrade('1')
    showAnswer(false)
  }

  return (
    <Card>
      <header>{`Learn ${getCardByIdData?.name}`}</header>
      <Typography>{`Question  ${data?.question}`}</Typography>
      <Typography>{`Count of attempts: ${data?.shots}`}</Typography>
      {!answer && <Button onClick={showAnswerHandler}>Show Answer</Button>}
      {answer && (
        <div>
          <Typography>{`Answer: ${data?.answer}`}</Typography>
          <img alt={''} className={s.image} src={`${data?.answerImg}`} />
          <RadioGroup defaultValue={prevGrade}>
            <RadioItem onClick={() => setGrade('1')} value={'1'}>
              Did not know
            </RadioItem>
            <RadioItem onClick={() => setGrade('2')} value={'2'}>
              Forgot
            </RadioItem>
            <RadioItem onClick={() => setGrade('3')} value={'3'}>
              A lot of thought
            </RadioItem>
            <RadioItem onClick={() => setGrade('4')} value={'4'}>
              Confused
            </RadioItem>
            <RadioItem onClick={() => setGrade('5')} value={'5'}>
              Knew the answer
            </RadioItem>
          </RadioGroup>
          <Button onClick={nextQuestion}>Next Question</Button>
        </div>
      )}
    </Card>
  )
}

export default Learn
