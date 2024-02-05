import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import { FormValuesForgotPassword, forgotPasswordSchema } from '@/pages/auth/forgotPassword/utils'
import { htmlContent } from '@/pages/auth/forgotPassword/utils/sendEmail'
import { usePasswordRecoveryMutation } from '@/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './forgotPassword.module.scss'
export const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesForgotPassword>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })
  const navigate = useNavigate()
  const [passwordRecovery] = usePasswordRecoveryMutation()
  const onSubmit = async (data: FormValuesForgotPassword) => {
    passwordRecovery({ email: data.email, html: htmlContent })
    navigate('/check-email', { state: { email: data.email } })
  }

  const signInRedirect = () => {
    navigate('/sign-in')
  }

  return (
    <Card classNameWrapper={s.forgotPasswordWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.signInLabel} variant={'large'}>
          Forgot your password?
        </Typography>
        <TextFieldControlled
          className={s.emailField}
          control={control}
          errorMessage={errors.email?.message}
          id={'email'}
          label={'Email'}
          name={'email'}
          placeholder={'example@gmail.com'}
        />
        <Typography as={'p'} className={s.enterEmail} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <Button className={s.submitButton} onClick={signInRedirect} variant={'link'}>
        Try logging in
      </Button>
    </Card>
  )
}
