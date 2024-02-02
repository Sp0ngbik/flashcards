import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextFieldControlled } from '@/common/ui/controlled'
import { Typography } from '@/common/ui/typography'
import { FormValuesForgotPassword } from '@/pages/auth/forgotPassword/utils'
import { signInSchema } from '@/pages/auth/signIn/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './forgotPassword.module.scss'

export const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesForgotPassword>({
    defaultValues: { email: '' },
    resolver: zodResolver(signInSchema),
  })
  const onSubmit = (date: FormValuesForgotPassword) => {
    console.log(date)
  }

  return (
    <Card>
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
        <Button fullWidth>Send Instructions</Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <Button className={s.submitButton} variant={'link'}>
        Try logging in
      </Button>
    </Card>
  )
}
