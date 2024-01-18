import { useForm } from 'react-hook-form'

import { FormValuesForgotPassword } from '@/components/auth/forgotPassword/utils'
import { signInSchema } from '@/components/auth/signIn/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextFieldControlled } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
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
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
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
