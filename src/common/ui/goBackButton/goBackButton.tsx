import { useNavigate } from 'react-router-dom'

import { ArrowBack } from '@/assets/icons/arrow-back-outline'
import { Button } from '@/common/ui/button'

import s from '@/common/ui/goBackButton/goBackButton.module.scss'

const GoBackButton = () => {
  const navigate = useNavigate()
  const goBackHandler = () => navigate(-1)

  return (
    <div className={s.backButtonWrapper}>
      <Button
        className={s.backTo}
        icon={<ArrowBack className={s.arrowBack} />}
        onClick={goBackHandler}
        variant={'link'}
      >
        Return to Previous Page
      </Button>
    </div>
  )
}

export default GoBackButton
