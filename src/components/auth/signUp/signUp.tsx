import { useForm } from 'react-hook-form'

import { FormValuesSignUp, signUpSchema } from '@/components/auth/signUp/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextFieldControlled } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signUp.module.scss'

export const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValuesSignUp>({
    defaultValues: { confirmPassword: '', email: '', password: '' },
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.signUpLabel} variant={'large'}>
          Sign Up
        </Typography>
        <TextFieldControlled
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
        <TextFieldControlled
          className={s.confirmPassword}
          control={control}
          errorMessage={errors.confirmPassword?.message}
          label={'Confirm Password'}
          name={'confirmPassword'}
          placeholder={'Confirm password'}
          variant={'password'}
        />
        <Button aria-label={'Sign Up'} fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Already have an account?
      </Typography>
      <Button className={s.submitButton} variant={'link'}>
        Sign In
      </Button>
    </Card>
  )
}
