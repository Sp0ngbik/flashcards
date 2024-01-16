import { useForm } from 'react-hook-form'

import { FormValuesSignIn, signInSchema } from '@/components/auth/signIn/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckboxControlled, TextFieldControlled } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

export const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesSignIn>({
    defaultValues: { email: '', password: '', rememberMe: false },
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = (data: FormValuesSignIn) => {
    console.log(data)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.signInLabel} variant={'large'}>
          Sign In
        </Typography>
        <TextFieldControlled
          className={s.emailField}
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
        />
        <TextFieldControlled
          className={s.passwordField}
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          variant={'password'}
        />
        <CheckboxControlled
          className={s.rememberMe}
          control={control}
          name={'rememberMe'}
          text={'Remember me'}
        />
        <Typography className={s.forgotPassword} variant={'body2'}>
          Forgot Password?
        </Typography>
        <Button fullWidth>Sign In</Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Don&apos;t have an account?
      </Typography>
      <Button className={s.submitButton} variant={'link'}>
        Sign Up
      </Button>
    </Card>
  )
}
