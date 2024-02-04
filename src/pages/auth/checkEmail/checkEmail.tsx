import { useNavigate } from 'react-router-dom'

import { Email } from '@/assets/icons/email'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { Typography } from '@/common/ui/typography'

import s from './checkEmail.module.scss'

const CheckEmail = () => {
  const navigate = useNavigate()
  const redirectHandler = () => {
    navigate('/sign-in')
  }

  return (
    <Card>
      <Typography className={s.checkEmailLabel} variant={'large'}>
        Check Email?
      </Typography>
      <div className={s.iconWrapper}>
        <Email className={s.icon} />
      </div>
      <Typography as={'p'} className={s.sentEmail} variant={'body2'}>
        We’ve sent an Email with instructions to <br /> Заглушка
      </Typography>
      <Button className={s.button} fullWidth onClick={redirectHandler}>
        Back to Sign In
      </Button>
    </Card>
  )
}

export default CheckEmail
