import { Email } from '@/assets/icons/email'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { Typography } from '@/common/ui/typography'

import s from './checkEmail.module.scss'
type Props = {
  email: string
}

const CheckEmail = ({ email }: Props) => {
  return (
    <Card>
      <Typography className={s.checkEmailLabel} variant={'large'}>
        Check Email?
      </Typography>
      <div className={s.iconWrapper}>
        <Email className={s.icon} />
      </div>
      <Typography as={'p'} className={s.sentEmail} variant={'body2'}>
        We’ve sent an Email with instructions to <br /> {email}
      </Typography>
      <Button className={s.button} fullWidth>
        Back to Sign In
      </Button>
    </Card>
  )
}

export default CheckEmail
