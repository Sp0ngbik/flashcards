import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import GoBackButton from '@/common/ui/goBackButton/goBackButton'
import { Loader } from '@/common/ui/loader'
import { RadioGroup } from '@/common/ui/radioGroup'
import { RadioItem } from '@/common/ui/radioGroup/radioItem'
import { Typography } from '@/common/ui/typography'
import { useCardFilter } from '@/pages/cards/hooks/useCardFilter'
import LearnImage from '@/pages/learn/learnImage/learnImage'
import { useLearnCardQuery, usePostCardMutation } from '@/services/cards/cards.service'

import s from './learn.module.scss'

const Learn = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useLearnCardQuery({ id })
  const { getDeckById } = useCardFilter(id)
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
    showAnswer(false)
  }

  if (isLoading) {
    return <Loader transparentBackground />
  }

  return (
    <div className={s.cardWrapper}>
      <GoBackButton />
      <Card className={s.learnCard}>
        <Typography as={'header'} variant={'h1'}>{`Learn ${getDeckById?.name}`}</Typography>
        <Typography className={s.text}>{`Question:  ${data?.question}`}</Typography>
        <LearnImage imageSRC={`${data?.questionImg}`} />
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
            <Typography className={s.text}>{`Answer: ${data?.answer}`}</Typography>
            <LearnImage imageSRC={`${data?.answerImg}`} />
            <Typography>Rate yourself:</Typography>
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
