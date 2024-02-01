import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
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

  const showAnswerHandler = () => {
    showAnswer(true)
  }
  const cardId = data?.id || ''

  const prevGrade = data?.grade.toString() || '1'

  const [grade, setGrade] = useState<string>('1')
  const nextQuestion = async () => {
    await post({ cardId, grade: Number(grade) }).unwrap()
    setGrade('1')
    showAnswer(false)
  }

  return (
    <div className={s.cardWrapper}>
      <NavLink className={s.backToDeck} to={`/cards/${id}`}>
        <ArrowBack className={s.arrowBack} />
        Back to Decks List
      </NavLink>
      <Card className={s.learnCard}>
        <Typography as={'header'} variant={'h1'}>{`Learn ${getCardByIdData?.name}`}</Typography>
        <Typography>{`Question  ${data?.question}`}</Typography>
        <img alt={''} className={s.learnImage} src={`${data?.questionImg}`} />
        <Typography
          className={s.sub}
          variant={'caption'}
        >{`Count of attempts: ${data?.shots}`}</Typography>
        {!answer && (
          <Button fullWidth onClick={showAnswerHandler}>
            Show Answer
          </Button>
        )}
        {answer && (
          <div>
            <Typography>{`Answer: ${data?.answer}`}</Typography>
            <img alt={''} className={s.learnImage} src={`${data?.answerImg}`} />
            <RadioGroup defaultValue={prevGrade} onValueChange={setGrade}>
              <RadioItem value={'1'}>Did not know</RadioItem>
              <RadioItem value={'2'}>Forgot</RadioItem>
              <RadioItem value={'3'}>A lot of thought</RadioItem>
              <RadioItem value={'4'}>Confused</RadioItem>
              <RadioItem value={'5'}>Knew the answer</RadioItem>
            </RadioGroup>
            <Button fullWidth onClick={nextQuestion}>
              Next Question
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Learn
