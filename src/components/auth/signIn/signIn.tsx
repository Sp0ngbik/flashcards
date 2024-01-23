import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import { FormValuesSignIn, signInSchema } from '@/components/auth/signIn/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckboxControlled, TextFieldControlled } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'
import { useLoginMutation } from '@/services/auth/auth.sevice'
import { setAuthenticated } from '@/services/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
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

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const [login, { error, isLoading }] = useLoginMutation()

  const onSubmit = async (data: FormValuesSignIn) => {
    await login(data).unwrap()
    dispatch(setAuthenticated(true))
  }

  const handleSignUpClick = () => {
    navigate('/login')
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  if (isLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
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
          placeholder={'example@gmail.com'}
        />
        <TextFieldControlled
          className={s.passwordField}
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Your password'}
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
        <Button aria-label={'Sign In'} fullWidth>
          Sign In
        </Button>
      </form>
      <Typography className={s.formQuestion} variant={'body2'}>
        Don&apos;t have an account?
      </Typography>
      <Button className={s.submitButton} onClick={handleSignUpClick} variant={'link'}>
        Sign Up
      </Button>
    </Card>
  )
}
